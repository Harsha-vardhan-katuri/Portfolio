import { notFound } from "next/navigation"
import ProjectDetails from "@/app/components/ProjectDetails"

const projects = [
  {
    slug: "ble-motion-detection",
    title: "BLE Motion Detection System",
    category: "Embedded Systems",
    description:
      "A high-precision Bluetooth Low Energy (BLE) motion detection system that decodes BLE packets and analyzes accelerometer data for accurate movement detection.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["C", "BLE Protocol", "Accelerometer Integration", "Signal Processing"],
    achievements: [
      "Achieved 95% precision in extracting critical accelerometer data",
      "Implemented a 70% faster classification process for iBeacon signals",
      "Developed motion analysis algorithms detecting movement within 100 milliseconds per packet",
      "Improved packet reliability to 98% through advanced error correction techniques",
    ],
  },
  {
    slug: "iot-weather-reporting",
    title: "IoT Weather Reporting System",
    category: "IoT",
    description:
      "An Internet of Things (IoT) based weather reporting system that measures and transmits real-time environmental data, providing accurate and timely weather information.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["IoT Sensors", "ESP8266", "ThingSpeak", "Data Visualization"],
    achievements: [
      "Developed a system updating weather data every 5 seconds",
      "Integrated ThingSpeak for data accessibility, reducing retrieval time by 60%",
      "Achieved 99.9% accuracy in environmental readings",
      "Implemented sensor interfacing for up to 10 different environmental parameters",
    ],
  },
  {
    slug: "image-transmission",
    title: "Image Transmission System",
    category: "Communication",
    description:
      "An efficient packetized image transmission and error correction system, designed for reliable and fast image transfer in various communication scenarios.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["C", "Image Processing", "Network Protocols", "Error Correction Algorithms"],
    achievements: [
      "Enhanced data throughput by 40% through advanced segmentation techniques",
      "Implemented CRC-16/XMODEM error detection, ensuring 99% accuracy in packet integrity",
      "Reduced display latency by 30% through refined image reconstruction algorithms",
      "Improved real-time delivery performance, reducing packet loss to under 2%",
    ],
  },
]

export default function ProjectDemo({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetails {...project} />
}
