"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Plus,
  Share,
  Bell,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
  location?: string;
  virtualLink?: string;
  isVirtual: boolean;
  maxAttendees?: number;
  registrationRequired: boolean;
  registrationDeadline?: string;
  tags: string[];
  createdAt: string;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
  };
  attendeeCount: number;
  isRegistered?: boolean;
  imageUrl?: string;
}

const EVENT_TYPES = [
  "SERVICE",
  "BIBLE_STUDY",
  "MISSION_TRIP",
  "CONFERENCE",
  "RETREAT",
  "FELLOWSHIP",
  "OUTREACH",
];

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterTime, setFilterTime] = useState("upcoming");

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchTerm,
        type: filterType,
        time: filterTime,
      });

      const response = await fetch(`/api/events?${params}`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterType, filterTime]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleRegister = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Successfully registered for event");
        fetchEvents();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to register for event");
      }
    } catch (error) {
      console.error("Failed to register for event:", error);
      toast.error("Failed to register for event");
    }
  };

  const handleUnregister = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Successfully unregistered from event");
        fetchEvents();
      } else {
        toast.error("Failed to unregister from event");
      }
    } catch (error) {
      console.error("Failed to unregister from event:", error);
      toast.error("Failed to unregister from event");
    }
  };

  const handleShare = async (event: Event) => {
    try {
      await navigator.share({
        title: event.title,
        text: event.description,
        url: `${window.location.origin}/events/${event.id}`,
      });
    } catch {
      navigator.clipboard.writeText(
        `${window.location.origin}/events/${event.id}`
      );
      toast.success("Event link copied to clipboard");
    }
  };

  const formatEventDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    if (end && start.toDateString() !== end.toDateString()) {
      return `${start.toLocaleDateString(
        "en-US",
        dateOptions
      )} - ${end.toLocaleDateString("en-US", dateOptions)}`;
    } else {
      const dateStr = start.toLocaleDateString("en-US", dateOptions);
      const timeStr = start.toLocaleTimeString("en-US", timeOptions);
      return `${dateStr} at ${timeStr}`;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "SERVICE":
        return "bg-blue-100 text-blue-800";
      case "BIBLE_STUDY":
        return "bg-green-100 text-green-800";
      case "MISSION_TRIP":
        return "bg-orange-100 text-orange-800";
      case "CONFERENCE":
        return "bg-purple-100 text-purple-800";
      case "RETREAT":
        return "bg-indigo-100 text-indigo-800";
      case "FELLOWSHIP":
        return "bg-yellow-100 text-yellow-800";
      case "OUTREACH":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isEventPast = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">Please wait while we load the events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ministry Events</h1>
          <p className="text-gray-600">
            Discover and join upcoming ministry events
          </p>
        </div>

        {(user.role === "MINISTRY_LEADER" ||
          user.role === "ADMIN" ||
          user.role === "SUPER_ADMIN") && (
          <Button className="bg-fom-primary hover:bg-fom-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Select value={filterTime} onValueChange={setFilterTime}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="past">Past Events</SelectItem>
              <SelectItem value="all">All Events</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Events Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== "all" || filterTime !== "upcoming"
                ? "Try adjusting your search or filters."
                : "Check back soon for new events."}
            </p>
            {(searchTerm ||
              filterType !== "all" ||
              filterTime !== "upcoming") && (
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterTime("upcoming");
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Event Date Box */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-fom-primary text-white rounded-lg flex flex-col items-center justify-center text-center">
                      <div className="text-xs font-medium">
                        {new Date(event.startDate)
                          .toLocaleDateString("en-US", { month: "short" })
                          .toUpperCase()}
                      </div>
                      <div className="text-xl font-bold">
                        {new Date(event.startDate).getDate()}
                      </div>
                      <div className="text-xs">
                        {new Date(event.startDate).getFullYear()}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 truncate">
                            {event.title}
                          </h3>
                          {isEventPast(event.endDate || event.startDate) && (
                            <Badge variant="secondary">Past Event</Badge>
                          )}
                          {event.isRegistered && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Registered
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <Badge
                            className={getEventTypeColor(event.type)}
                            variant="secondary"
                          >
                            {event.type.replace("_", " ")}
                          </Badge>

                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatEventDate(event.startDate, event.endDate)}
                          </div>

                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          )}

                          {event.isVirtual && (
                            <Badge variant="outline">Virtual</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(event)}
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendeeCount}{" "}
                          {event.maxAttendees ? `/ ${event.maxAttendees}` : ""}{" "}
                          attending
                        </div>

                        <div>
                          Organized by {event.organizer.firstName}{" "}
                          {event.organizer.lastName}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {event.registrationRequired &&
                          !isEventPast(event.endDate || event.startDate) && (
                            <>
                              {event.isRegistered ? (
                                <Button
                                  variant="outline"
                                  onClick={() => handleUnregister(event.id)}
                                >
                                  Unregister
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleRegister(event.id)}
                                  disabled={
                                    !!(
                                      event.maxAttendees &&
                                      event.attendeeCount >= event.maxAttendees
                                    )
                                  }
                                >
                                  {event.maxAttendees &&
                                  event.attendeeCount >= event.maxAttendees
                                    ? "Event Full"
                                    : "Register"}
                                </Button>
                              )}
                            </>
                          )}

                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>

                    {/* Registration Deadline Warning */}
                    {event.registrationDeadline &&
                      new Date(event.registrationDeadline) > new Date() &&
                      new Date(event.registrationDeadline) <=
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Registration closes soon:</strong>{" "}
                            {new Date(
                              event.registrationDeadline
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
