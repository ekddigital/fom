/**
 * EKD Digital Asset Management Service
 * Handles certificate file storage and retrieval using EKD Assets API
 */

interface EKDLoginResponse {
  access_token: string;
  token_type: string;
}

interface EKDUploadResponse {
  id: string;
  client_identifier: string;
  project_name: string;
  type: string;
  filename: string;
  size_bytes: number;
  uploaded_at: string;
  tags: string[];
  owner_id: string;
  access_url: string;
}

interface EKDAssetResponse {
  id: string;
  client_identifier: string;
  project_name: string;
  type: string;
  filename: string;
  size_bytes: number;
  uploaded_at: string;
  tags: string[];
  owner_id: string;
  access_url: string;
  metadata: Record<string, unknown>;
}

export class EKDAssetService {
  private static baseUrl = "https://www.assets.ekddigital.com";
  private static cachedToken: string | null = null;
  private static tokenExpiry: number = 0;

  /**
   * Get authentication token (cached for efficiency)
   */
  private static async getAuthToken(): Promise<string> {
    // Return cached token if still valid (assuming 1 hour expiry)
    if (this.cachedToken && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    const username = process.env.EKD_ASSETS_USERNAME;
    const password = process.env.EKD_ASSETS_PASSWORD;

    if (!username || !password) {
      throw new Error("EKD Assets credentials not configured");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/login/access-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=password&username=${encodeURIComponent(
            username
          )}&password=${encodeURIComponent(
            password
          )}&scope=&client_id=&client_secret=`,
        }
      );

      if (!response.ok) {
        throw new Error(`EKD login failed: ${response.status}`);
      }

      const data: EKDLoginResponse = await response.json();
      this.cachedToken = data.access_token;
      this.tokenExpiry = Date.now() + 50 * 60 * 1000; // 50 minutes (safe buffer)

      return data.access_token;
    } catch (error) {
      console.error("EKD authentication error:", error);
      throw new Error("Failed to authenticate with EKD Assets API");
    }
  }

  /**
   * Upload certificate file to EKD Assets
   */
  static async uploadCertificate(
    fileBuffer: Buffer,
    filename: string,
    certificateData: {
      certificateId: string;
      recipientName: string;
      templateName: string;
      issueDate: string;
    }
  ): Promise<EKDUploadResponse> {
    try {
      const token = await this.getAuthToken();

      // Create form data
      const formData = new FormData();

      // Convert buffer to blob for upload
      const blob = new Blob([fileBuffer], {
        type: filename.endsWith(".pdf") ? "application/pdf" : "image/png",
      });

      formData.append("file", blob, filename);

      // Required EKD API parameters
      formData.append(
        "client_identifier",
        process.env.EKD_ASSETS_CLIENT_IDENTIFIER || "fishers-of-men"
      );
      formData.append("project_name", "fom-certificates");
      formData.append(
        "asset_type",
        filename.endsWith(".pdf") ? "document" : "image"
      );

      formData.append(
        "title",
        `Certificate: ${certificateData.templateName} - ${certificateData.recipientName}`
      );
      formData.append(
        "description",
        `Certificate issued on ${certificateData.issueDate} for ${certificateData.recipientName}`
      );
      formData.append(
        "tags",
        `certificate,${certificateData.templateName
          .toLowerCase()
          .replace(/\s+/g, "-")},fom`
      );

      // Add metadata
      formData.append(
        "metadata",
        JSON.stringify({
          certificate_id: certificateData.certificateId,
          recipient_name: certificateData.recipientName,
          template_name: certificateData.templateName,
          issue_date: certificateData.issueDate,
          project: "fom-certificates",
          client: "fishers-of-men",
        })
      );

      const response = await fetch(`${this.baseUrl}/api/v1/assets/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`EKD upload failed: ${response.status} - ${errorText}`);
      }

      const uploadResult: EKDUploadResponse = await response.json();
      console.log("Certificate uploaded to EKD Assets:", uploadResult.id);

      return uploadResult;
    } catch (error) {
      console.error("EKD upload error:", error);
      throw new Error("Failed to upload certificate to EKD Assets");
    }
  }

  /**
   * Get certificate download URL from EKD Assets
   */
  static async getCertificateDownloadUrl(assetId: string): Promise<string> {
    try {
      const token = await this.getAuthToken();

      const response = await fetch(`${this.baseUrl}/api/v1/assets/${assetId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`EKD asset fetch failed: ${response.status}`);
      }

      const asset: EKDAssetResponse = await response.json();
      return asset.access_url;
    } catch (error) {
      console.error("EKD download URL error:", error);
      throw new Error("Failed to get certificate download URL");
    }
  }

  /**
   * Delete certificate from EKD Assets
   */
  static async deleteCertificate(assetId: string): Promise<boolean> {
    try {
      const token = await this.getAuthToken();

      const response = await fetch(`${this.baseUrl}/api/v1/assets/${assetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("EKD delete error:", error);
      return false;
    }
  }

  /**
   * List certificates for a specific recipient or template
   */
  static async listCertificates(filters?: {
    recipientName?: string;
    templateName?: string;
    limit?: number;
  }): Promise<EKDAssetResponse[]> {
    try {
      const token = await this.getAuthToken();

      const params = new URLSearchParams();
      params.append("tags", "certificate,fom");

      if (filters?.limit) {
        params.append("limit", filters.limit.toString());
      }

      const response = await fetch(`${this.baseUrl}/api/v1/assets?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`EKD list failed: ${response.status}`);
      }

      const assets: EKDAssetResponse[] = await response.json();

      // Filter by recipient or template if specified
      if (filters?.recipientName || filters?.templateName) {
        return assets.filter((asset) => {
          const metadata = asset.metadata || {};
          if (
            filters.recipientName &&
            metadata.recipient_name !== filters.recipientName
          ) {
            return false;
          }
          if (
            filters.templateName &&
            metadata.template_name !== filters.templateName
          ) {
            return false;
          }
          return true;
        });
      }

      return assets;
    } catch (error) {
      console.error("EKD list error:", error);
      throw new Error("Failed to list certificates");
    }
  }
}
