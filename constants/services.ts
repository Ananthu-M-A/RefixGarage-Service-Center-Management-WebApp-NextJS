export const SERVICE_IMAGES = [
    { name: "Data Recovery", src: "/images/all-software-hardware-repair.jpg" },
    { name: "Logic Board Swapping", src: "/images/all-software-hardware-repair.jpg" },
    { name: "⁠Upgradation & Training", src: "/images/all-software-hardware-repair.jpg" },
    { name: "⁠Storage Upgradation", src: "/images/all-software-hardware-repair.jpg" },
    { name: "Software Solutions", src: "/images/all-software-hardware-repair.jpg" },
    { name: "CPU Reworks", src: "/images/all-software-hardware-repair.jpg" },
    { name: "Dead Phone Repair", src: "/images/motherboard-repair.jpg" },
    { name: "Water Damage", src: "/images/water-damage-repair.jpg" },
    { name: "Display & Glass Change", src: "/images/screen-replacement.jpg" },
    { name: "Laptop Service", src: "/images/all-software-hardware-repair.jpg" },
    { name: "Web Development", src: "/images/all-software-hardware-repair.jpg" },
    { name: "Services with Warranty", src: "/images/battery-replacement.jpg" },
] as const;

export type ServiceImage = typeof SERVICE_IMAGES[number];