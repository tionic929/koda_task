import { prisma } from "../src/lib/prisma.js";

const clientNames = [
  "Acme Corporation",
  "Apex Global Solutions",
  "Starlight Media Group",
  "Nexus Tech Labs",
  "Vanguard Logistics",
  "BlueHorizon Energy",
  "Zenith Financial",
  "Quantum Dynamics",
  "Echo Brand Agency",
  "Summit Healthcare",
  "Hyperion Robotics",
  "Nova Cyber Security",
  "Solstice Capital",
  "Orbit E-Commerce",
  "Pinnacle Software",
];

const projectTitles = [
  "Website Redesign",
  "Mobile App Development",
  "Cloud Migration & Security Audit",
  "E-Commerce Platform Launch",
  "Brand Strategy & Identity Overhaul",
  "Customer Portal Portal Refactor",
  "AI Analytics Dashboard Integration",
  "ERP System Implementation",
  "Payment Gateway Infrastructure",
  "SEO & Content Marketing Campaign",
  "DevOps Automation & CI/CD Pipeline",
  "Inventory Tracking System",
  "Social Media App Development",
  "SaaS Multi-tenant Migration",
  "CRM Pipeline Customization",
  "IoT Fleet Monitoring Tool",
  "Microservices Architecture Upgrade",
  "Data Warehouse Integration",
  "Mobile Wallet UI/UX Redesign",
  "Automated Billing Engine",
];

const descriptions = [
  "Complete end-to-end overhaul targeting improved user conversion and modern aesthetic.",
  "Building cross-platform mobile application for iOS and Android using modern frameworks.",
  "Upgrading legacy infrastructure to high-availability cloud cluster with enhanced threat protection.",
  "Developing custom storefront with real-time inventory sync and secure checkout flow.",
  "Comprehensive rebrand including brand guidelines, typography, color palette, and assets.",
  "Enhancing client self-service capabilities with real-time data sync and export functionality.",
  "Integrating predictive machine learning models into executive reporting dashboards.",
  "Streamlining enterprise operational workflows across finance, HR, and supply chain.",
];

const statusOptions = ["Planning", "In Progress", "On Hold", "Completed"] as const;
const priorityOptions = ["Low", "Medium", "High"] as const;

function getRandomElement<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log("🌱 Clearing existing projects...");
  await prisma.project.deleteMany();

  console.log("🚀 Seeding 50 random projects into database...");

  const projectsToCreate = Array.from({ length: 50 }).map((_, index) => {
    const clientName = getRandomElement(clientNames);
    const titleBase = getRandomElement(projectTitles);
    const projectName = `${clientName.split(" ")[0]} - ${titleBase} #${index + 1}`;
    const description = getRandomElement(descriptions);
    const status = getRandomElement(statusOptions);
    const priority = getRandomElement(priorityOptions);

    // Random start date between 60 days ago and 30 days in future
    const now = new Date();
    const startDate = getRandomDate(
      new Date(now.getTime() - 60 * 86400000),
      new Date(now.getTime() + 30 * 86400000)
    );

    // Due date between 15 days and 120 days after start date
    const dueDate = new Date(
      startDate.getTime() + (15 + Math.floor(Math.random() * 105)) * 86400000
    );

    return {
      clientName,
      projectName,
      description,
      status,
      priority,
      startDate,
      dueDate,
    };
  });

  for (const data of projectsToCreate) {
    await prisma.project.create({ data });
  }

  console.log("✅ Successfully seeded 50 projects!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
