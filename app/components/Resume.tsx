import { Github, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function Resume() {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-8 max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Harsha Vardhan Katuri</h1>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="tel:9676227794" className="flex items-center gap-2 hover:text-blue-600">
            <Phone className="w-4 h-4" />
            9676227794
          </Link>
          <Link href="mailto:katuriharshavardhan369@gmail.com" className="flex items-center gap-2 hover:text-blue-600">
            <Mail className="w-4 h-4" />
            katuriharshavardhan369@gmail.com
          </Link>
          <Link href="https://github.com/Harsha-vardhan-katuri" className="flex items-center gap-2 hover:text-blue-600">
            <Github className="w-4 h-4" />
            GitHub Profile
          </Link>
          <Link
            href="https://www.linkedin.com/in/harsha-vardhan-katuri-772166256/"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Link>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile Summary</h2>
        <p className="text-gray-700">
          Fresher with expertise in embedded systems, firmware development, and IoT solutions, skilled in assembling
          microcontroller systems and customizing firmware. Innovated and modelled IoT applications, transforming
          creative ideas into functional, practical designs. Improved workflows and optimized protocols to significantly
          enhance performance in embedded projects effectively.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Skills</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>Programming Languages:</strong> C, C++, Embedded C, Data Structures, Python, SQL
          </li>
          <li>
            <strong>Embedded Systems:</strong> Microcontroller Architectures, Hardware Interfacing, Linux Internals,
            Device Drivers
          </li>
          <li>
            <strong>Networking Protocols and Concepts:</strong> Socket Programming, I2C, SPI, UART, CAN, TCP/IP, RTOS
          </li>
          <li>
            <strong>System on Chips (SoCs):</strong> ESP8266, ARM Cortex-M, STM32, LPC2148
          </li>
          <li>
            <strong>Tools and Platforms:</strong> Keil IDE, STM32CubeIDE, MATLAB, Git, GitHub, Ubuntu
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Experience</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Embedded Systems Trainee - Vector India, Hyderabad</h3>
            <p className="text-gray-600 mb-2">July 2023 – June 2024</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Mastered advanced Embedded Systems concepts through practical application, completing 3+ IoT and
                microcontroller projects.
              </li>
              <li>
                Innovated an IoT Weather Reporting System, achieving 99% data accuracy, 5-second updates, and processing
                100+ data points.
              </li>
              <li>
                Strengthened embedded C, RTOS, and cloud platforms knowledge, improving efficiency by 50% and reducing
                debugging time.
              </li>
              <li>
                Effected data visualization on Thing Speak, providing 500+ real-time visualizations, enabling easy
                access to environmental metrics.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Project Intern - Smart Bridge, Hyderabad</h3>
            <p className="text-gray-600 mb-2">January 2023 – April 2023</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Spearheaded development of Voice-Based Home Automation System, increasing automation efficiency by 40%
                with approaches.
              </li>
              <li>
                Conceived and implemented Node-RED workflows, reducing manual intervention in device control by 50% and
                optimizing tasks.
              </li>
              <li>
                Integrated IBM Watson IoT and Python tools, reducing system response time by 30% and improving overall
                system performance.
              </li>
              <li>
                Achieved seamless functionality, enabling control of up to 10 devices via voice commands, significantly
                enhancing user experience.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Gudlavalleru Engineering College</h3>
            <p className="text-gray-700">B.Tech in Electronics and Communication Engineering</p>
            <p className="text-gray-600">August 2019 – May 2023</p>
            <p className="text-gray-700">Grade: 8.36</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Narayana Junior College</h3>
            <p className="text-gray-700">Intermediate in MPC</p>
            <p className="text-gray-600">June 2017 – April 2019</p>
            <p className="text-gray-700">Grade: 9.94</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Projects</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">High-Precision BLE Motion Detection and Signal Analysis System</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Architected a high-efficiency C program to decode BLE packets, achieving 95% precision in extracting
                critical accelerometer data.
              </li>
              <li>
                Distinguished iBeacon signals with a 70% faster classification process, enhancing system responsiveness
                and overall efficiency.
              </li>
              <li>
                Synthesized motion analysis algorithms to detect movement within 100 milliseconds per packet, improving
                processing speed.
              </li>
              <li>
                Reinforced data integrity through advanced error correction, improving packet reliability by 98%,
                ensuring robust transmission.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Efficient Packetized Image Transmission and Error Correction System
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Engineered a C program for packetized image transfer, enhancing data throughput by 40% through
                segmentation techniques.
              </li>
              <li>
                Implemented CRC-16/XMODEM error detection, ensuring 99% accuracy in maintaining packet integrity during
                data transmission.
              </li>
              <li>
                Refined image reconstruction algorithms, cutting display latency by 30% and achieving 98% accuracy in
                rendering images.
              </li>
              <li>
                Upgraded network communication protocols, reducing packet loss to under 2% and improving real-time
                delivery performance.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">IoT Based Weather Reporting System</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Founded a monitoring solution to measure and transmit real-time weather data, updating every 5 seconds
                efficiently and reliably.
              </li>
              <li>
                Enhanced data accessibility by integrating Thing Speak, slashing retrieval time by 60% for 100+ users,
                improving efficiency.
              </li>
              <li>
                Overhauled data transmission logic, achieving 99.9% accuracy in environmental readings and significantly
                improving reliability.
              </li>
              <li>
                Revitalized IoT design techniques, supporting sensor interfacing for up to 10 different environmental
                parameters seamlessly.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Key Achievements and Certifications</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            Secured a 91% in the JEE Mains exam, outperforming thousands of candidates, and ranked as the top student in
            Intermediate, showcasing the ability to solve complex problems and deliver effective solutions.
          </li>
          <li>
            Linux Device Drivers Certification, ARM Cortex-M Architecture Certification, SQL Certification, Python
            programming Certification.
          </li>
        </ul>
      </section>
    </div>
  )
}
