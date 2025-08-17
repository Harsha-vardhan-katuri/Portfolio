import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProjectDetailsProps {
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
}

export default function ProjectDetails({
  title,
  category,
  description,
  image,
  technologies,
  achievements,
}: ProjectDetailsProps) {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-white py-20">
      <div className="container mx-auto px-4">
        <Link
          href="/#projects"
          className="inline-flex items-center text-[#ff6b6b] hover:text-[#ff8e8e] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-[#ff6b6b] text-xl mb-8">{category}</p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-300 mb-6">{description}</p>

            <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
            <ul className="list-disc list-inside mb-6">
              {technologies.map((tech, index) => (
                <li key={index} className="text-gray-300">
                  {tech}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside">
              {achievements.map((achievement, index) => (
                <li key={index} className="text-gray-300">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
