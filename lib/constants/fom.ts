// FOM Constants and Configuration
// Centralized constants for Fishers of Men platform

// Colors are now centralized in app/globals.css
// Use CSS classes like 'bg-primary', 'text-primary', 'fom-bg-primary', etc.
// This ensures all colors are managed in one place and easily changeable

export const FOM_BRAND = {
  name: "Fishers of Men",
  tagline: "Bringing Jesus to the World",
  foundedYear: 2019,
  mission: "Making disciples of all nations",
  scriptureVerse: "Matthew 4:19",
  scriptureText:
    'And he said to them, "Follow me, and I will make you fishers of men."',
  greatCommission: "Matthew 28:19",
  greatCommissionText: "Therefore go and make disciples of all nations",
  // 2 Kings 6:16 - Our covenant verse
  covenantVerse: "2 Kings 6:16",
  covenantText:
    "Do not be afraid, for those who are with us are more than those who are with them",
} as const;

export const FOM_LOGO = {
  icon: "/Logo.ico",
  png: "/Logo.png",
  alt: "Fishers of Men Logo",
} as const;

export const FOM_NAVIGATION = {
  public: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Give", href: "/give" },
    { label: "Contact Us", href: "/contact" },
  ],
  auth: [
    { label: "Sign In", href: "/sign-in" },
    { label: "Sign Up", href: "/sign-up" },
  ],
  resources: [
    { label: "Sermons", href: "/sermons" },
    { label: "Bible Studies", href: "/bible-studies" },
    { label: "Devotionals", href: "/devotionals" },
    { label: "Testimonies", href: "/testimonies" },
    { label: "Mission Reports", href: "/mission-reports" },
    { label: "Resources Library", href: "/resources" },
  ],
  community: [
    { label: "Community Hub", href: "/community" },
    { label: "Prayer Requests", href: "/prayer" },
    { label: "Small Groups", href: "/groups" },
    { label: "Fellowship", href: "/fellowship" },
    { label: "Connect", href: "/connect" },
  ],
  account: [
    { label: "My Dashboard", href: "/dash" },
    { label: "My Profile", href: "/dash/profile" },
    { label: "Settings", href: "/dash/settings" },
    { label: "My Journey", href: "/dash/journey" },
  ],
  ministry: [
    { label: "Content Management", href: "/content" },
    { label: "Manage Events", href: "/manage-events" },
    { label: "Certificates", href: "/ministry-certificates" },
  ],
  admin: [
    { label: "Admin Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Settings", href: "/admin/settings" },
  ],
} as const;

export const FOM_FEATURES = {
  ministry: {
    icon: "❤️",
    title: "Ministry & Outreach",
    description:
      "Join our mission to spread the gospel through community outreach, charitable work, and ministry programs.",
  },
  community: {
    icon: "👥",
    title: "Community & Fellowship",
    description:
      "Connect with fellow believers, join small groups, and build lasting friendships in our loving community.",
  },
  missions: {
    icon: "🌍",
    title: "Mission Trips",
    description:
      "Experience life-changing mission trips to spread the gospel and serve communities around the world.",
  },
  study: {
    icon: "📖",
    title: "Bible Study & Teaching",
    description:
      "Deepen your faith through expository teaching, Bible studies, and theological education.",
  },
  events: {
    icon: "📅",
    title: "Events & Conferences",
    description:
      "Attend inspiring conferences, workshops, and special events designed to strengthen your faith.",
  },
  prayer: {
    icon: "💬",
    title: "Prayer Network",
    description:
      "Submit prayer requests and join our prayer network to support one another in faith and life.",
  },
} as const;

export const USER_ROLES = {
  VISITOR: "VISITOR",
  MEMBER: "MEMBER",
  MINISTRY_LEADER: "MINISTRY_LEADER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export const CONTENT_CATEGORIES = {
  SERMON: "sermon",
  DEVOTIONAL: "devotional",
  BIBLICAL_STUDY: "biblical_study",
  TESTIMONY: "testimony",
  MISSION_REPORT: "mission_report",
} as const;
