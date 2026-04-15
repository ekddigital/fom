import { useEffect, useMemo, useRef, useState } from "react";
import { createDefaultConferenceDocument, STORAGE_KEY } from "./defaults";
import {
  createEmptyActionItem,
  createEmptyProgramSlot,
  createEmptyTeamMember,
  mergeStoredDocument,
  removeItemById,
  updateItemById,
} from "./helpers";
import {
  type ActionItem,
  type ActionStatus,
  type ConferenceCore,
  type ConferenceDocumentData,
  type FormalLetter,
  type ProgramSlot,
  type TeamMember,
} from "./types";

const CONFERENCE_DOC_API = "/api/admin/conference-docs";
const AUTO_SAVE_DELAY_MS = 900;

type SyncStatus =
  | "loading"
  | "database"
  | "database-unavailable"
  | "local-only"
  | "local-fallback";

function formatSavedTime(value: string | Date | null | undefined): string {
  if (!value) {
    return "";
  }

  const dateValue = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(dateValue.getTime())) {
    return "";
  }

  return dateValue.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function readLocalDraft(): ConferenceDocumentData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<ConferenceDocumentData>;
    return mergeStoredDocument(parsed);
  } catch (error) {
    console.error("Failed to load local conference document data:", error);
    return null;
  }
}

async function readJsonSafe(
  response: Response,
): Promise<Record<string, unknown> | null> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function useConferenceDocumentState() {
  const [data, setData] = useState<ConferenceDocumentData>(() =>
    createDefaultConferenceDocument(),
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("loading");
  const [syncMessage, setSyncMessage] = useState(
    "Loading document from database...",
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [databaseSyncEnabled, setDatabaseSyncEnabled] = useState(true);
  const hasSkippedInitialAutosaveRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    const hydrate = async () => {
      const localDraft = readLocalDraft();

      try {
        const response = await fetch(CONFERENCE_DOC_API, {
          method: "GET",
          cache: "no-store",
        });

        const payload = await readJsonSafe(response);

        if (!response.ok) {
          if (localDraft && !isCancelled) {
            setData(localDraft);
          }

          if (response.status === 401 || response.status === 403) {
            if (!isCancelled) {
              setDatabaseSyncEnabled(false);
              setSyncStatus("local-only");
              setSyncMessage("No admin session found. Saving in this browser.");
            }
            return;
          }

          if (response.status === 503 || payload?.code === "DB_UNAVAILABLE") {
            if (!isCancelled) {
              setSyncStatus("database-unavailable");
              setSyncMessage(
                "Database is currently unavailable. Your edits are saved locally.",
              );
            }
            return;
          }

          if (!isCancelled) {
            setSyncStatus("local-fallback");
            setSyncMessage(
              "Could not load from server. Using your local saved draft.",
            );
          }
          return;
        }

        const remoteData =
          payload?.data && typeof payload.data === "object"
            ? mergeStoredDocument(
                payload.data as Partial<ConferenceDocumentData>,
              )
            : null;

        if (isCancelled) {
          return;
        }

        if (remoteData) {
          setData(remoteData);
          setSyncStatus("database");
          setSyncMessage("Connected to database. Auto-save is active.");

          const remoteSavedAt =
            typeof payload?.savedAt === "string" ? payload.savedAt : null;
          setLastSavedAt(formatSavedTime(remoteSavedAt));

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          } catch (error) {
            console.error(
              "Failed to mirror server conference document data locally:",
              error,
            );
          }
          return;
        }

        if (localDraft) {
          setData(localDraft);
          setSyncStatus("local-fallback");
          setSyncMessage(
            "No database document found yet. Using your local saved draft.",
          );
          return;
        }

        setSyncStatus("database");
        setSyncMessage("Connected to database. Start editing to auto-save.");
      } catch (error) {
        console.error("Failed to load conference document data:", error);

        if (isCancelled) {
          return;
        }

        if (localDraft) {
          setData(localDraft);
        }

        setSyncStatus("local-fallback");
        setSyncMessage(
          "Could not reach the server. Your edits are saved locally.",
        );
      } finally {
        if (!isCancelled) {
          setIsHydrated(true);
        }
      }
    };

    void hydrate();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!hasSkippedInitialAutosaveRef.current) {
      hasSkippedInitialAutosaveRef.current = true;
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSavedAt(formatSavedTime(new Date()));
    } catch (error) {
      console.error("Failed to save conference document data:", error);
    }

    if (!databaseSyncEnabled) {
      setSyncStatus("local-only");
      setSyncMessage("Saved locally in this browser.");
      return;
    }

    let isCancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsSyncing(true);

        const response = await fetch(CONFERENCE_DOC_API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        const payload = await readJsonSafe(response);

        if (isCancelled) {
          return;
        }

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setDatabaseSyncEnabled(false);
            setSyncStatus("local-only");
            setSyncMessage(
              "Session no longer allows database save. Saved locally.",
            );
            return;
          }

          if (response.status === 503 || payload?.code === "DB_UNAVAILABLE") {
            setSyncStatus("database-unavailable");
            setSyncMessage(
              "Database unavailable. Saved locally and will retry on next changes.",
            );
            return;
          }

          setSyncStatus("local-fallback");
          setSyncMessage(
            "Database sync failed. Your current edits are still saved locally.",
          );
          return;
        }

        const remoteSavedAt =
          typeof payload?.savedAt === "string" ? payload.savedAt : null;

        setSyncStatus("database");
        setSyncMessage("Saved to database.");
        setLastSavedAt(formatSavedTime(remoteSavedAt || new Date()));
      } catch (error) {
        console.error("Failed to sync conference document data:", error);

        if (isCancelled) {
          return;
        }

        setSyncStatus("local-fallback");
        setSyncMessage(
          "Network error during database sync. Saved locally instead.",
        );
      } finally {
        if (!isCancelled) {
          setIsSyncing(false);
        }
      }
    }, AUTO_SAVE_DELAY_MS);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [data, databaseSyncEnabled, isHydrated]);

  const completedActions = useMemo(
    () => data.actionItems.filter((item) => item.status === "done").length,
    [data.actionItems],
  );

  const updateCore = (field: keyof ConferenceCore, value: string) => {
    setData((prev) => ({
      ...prev,
      core: {
        ...prev.core,
        [field]: value,
      },
    }));
  };

  const updateTeamMember = (
    id: string,
    field: keyof Omit<TeamMember, "id">,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      teamMembers: updateItemById(prev.teamMembers, id, {
        [field]: value,
      } as Partial<TeamMember>),
    }));
  };

  const updateProgramSlot = (
    id: string,
    field: keyof Omit<ProgramSlot, "id">,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      programSlots: updateItemById(prev.programSlots, id, {
        [field]: value,
      } as Partial<ProgramSlot>),
    }));
  };

  const updateActionItem = (
    id: string,
    field: keyof Omit<ActionItem, "id">,
    value: string,
  ) => {
    const resolvedValue = field === "status" ? (value as ActionStatus) : value;

    setData((prev) => ({
      ...prev,
      actionItems: updateItemById(prev.actionItems, id, {
        [field]: resolvedValue,
      } as Partial<ActionItem>),
    }));
  };

  const updateFormalLetter = (field: keyof FormalLetter, value: string) => {
    setData((prev) => ({
      ...prev,
      formalLetter: {
        ...prev.formalLetter,
        [field]: value,
      },
    }));
  };

  const addTeamMember = () => {
    setData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, createEmptyTeamMember()],
    }));
  };

  const addProgramSlot = () => {
    setData((prev) => ({
      ...prev,
      programSlots: [...prev.programSlots, createEmptyProgramSlot()],
    }));
  };

  const addActionItem = () => {
    setData((prev) => ({
      ...prev,
      actionItems: [...prev.actionItems, createEmptyActionItem()],
    }));
  };

  const removeTeamMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      teamMembers: removeItemById(prev.teamMembers, id),
    }));
  };

  const removeProgramSlot = (id: string) => {
    setData((prev) => ({
      ...prev,
      programSlots: removeItemById(prev.programSlots, id),
    }));
  };

  const removeActionItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      actionItems: removeItemById(prev.actionItems, id),
    }));
  };

  const resetTemplate = () => {
    const shouldReset = window.confirm(
      "Reset to the default FOM conference template? This will overwrite current values in this browser.",
    );

    if (!shouldReset) {
      return;
    }

    setData(createDefaultConferenceDocument());
  };

  return {
    data,
    lastSavedAt,
    syncStatus,
    syncMessage,
    isSyncing,
    completedActions,
    updateCore,
    updateTeamMember,
    updateProgramSlot,
    updateActionItem,
    updateFormalLetter,
    addTeamMember,
    addProgramSlot,
    addActionItem,
    removeTeamMember,
    removeProgramSlot,
    removeActionItem,
    resetTemplate,
  };
}
