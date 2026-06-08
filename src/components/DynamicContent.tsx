"use client";

import React, { useState } from "react";
import ContactForm from "@/components/ContactForm";

interface DynamicContentProps {
  activeTab: string;
  searchQuery?: string;
  onNavigate: (tab: string) => void;
}

export default function DynamicContent({
  activeTab,
  searchQuery = "",
  onNavigate,
}: DynamicContentProps) {
  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Review Form State (For Reviewers demo)
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRec, setReviewerRec] = useState("Accept");
  const [reviewerQuality, setReviewerQuality] = useState("Excellent");
  const [reviewerNovelty, setReviewerNovelty] = useState("High");
  const [reviewerComments, setReviewerComments] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  // List of editorial board members
  const editorialBoard = {
    eic: {
      name: "Vijayakumar Kadumbadi",
      affiliation: "Madras Engineering College",
      emails: ["vijayakumarkadumbadi23@gmail.com", "vijayakumar@madrascollege.ac.in"],
    },
    aes: [
      {
        name: "Ezhilvendan Munusamy",
        affiliation: "Panimalar Engineering College",
        email: "vendan7@gmail.com",
      },
      {
        name: "Sekar G",
        affiliation: "Adhiparasakthi Engineering College",
        email: "sekar@apec.edu.in",
      },
    ],
    managing: {
      name: "Thirumaraiselvan Pakirisamy",
      affiliation: "Adhiparasakthi Engineering College",
      email: "thirumarai@apec.edu.in",
    },
  };

  // Scope domains data
  const scopeDomains = [
    { domain: "Artificial Intelligence (AI) & Machine Learning (ML)", topics: "Supervised, unsupervised, semi-supervised, and reinforcement learning; generative models; probabilistic methods" },
    { domain: "Deep Learning Architectures & Applications", topics: "CNNs, RNNs, LSTMs, transformers, GANs, VAEs, graph neural networks, spiking neural networks" },
    { domain: "Federated Learning", topics: "Privacy-preserving, decentralized, and collaborative learning; cross-device and cross-silo settings; heterogeneous data handling" },
    { domain: "Distributed AI Systems", topics: "Decentralized training, multi-agent systems, swarm intelligence, distributed optimization" },
    { domain: "Cyber-Physical Systems (CPS)", topics: "Integration of computation, networking, and physical processes; autonomous control; real-time monitoring" },
    { domain: "Edge Intelligence & On-Device Learning", topics: "On-device training and inference; edge-cloud collaboration; resource-constrained learning" },
    { domain: "Wireless Communication", topics: "5G/6G networks, massive MIMO, spectrum sharing, signal processing, millimeter-wave communications" },
    { domain: "Wireless Sensor Networks (WSNs)", topics: "Energy-efficient protocols; data aggregation; localization; sensor fusion; IoT integration" },
    { domain: "Distributed Computing", topics: "Cloud computing, grid computing, peer-to-peer networks, consensus algorithms, distributed databases" },
    { domain: "Data Analytics", topics: "Big data analytics; predictive modeling; streaming analytics; large-scale data processing frameworks" },
    { domain: "Exploratory Data Analysis (EDA)", topics: "Visualization techniques; statistical modeling; anomaly detection; feature engineering" },
    { domain: "Reconfigurable Computing & Embedded Systems", topics: "FPGAs, GPUs, ASICs, SoCs; hardware acceleration for AI/ML; real-time embedded intelligence" },
    { domain: "Computer Communications & Networking", topics: "Network protocols; routing; QoS; software-defined networking (SDN); network function virtualization (NFV)" },
    { domain: "Internet of Things (IoT) & Real-Time Systems", topics: "IoT architectures; real-time data processing; sensor fusion; time-sensitive networking; M2M communication" },
    { domain: "Data Structures, Cryptology & Information Theory", topics: "Cryptographic protocols; homomorphic encryption; secure multi-party computation; entropy coding; compression" },
    { domain: "Artificial Intelligence & Robotics", topics: "Autonomous navigation; manipulation; human-robot interaction; robot learning; swarm robotics" },
    { domain: "Image Processing, Computer Vision, Pattern Recognition & Graphics", topics: "Object detection; segmentation; tracking; 3D reconstruction; face recognition; medical imaging" },
    { domain: "Data Mining & Big Data", topics: "Association rule mining; clustering; classification; text mining; web mining; large-scale data infrastructure" },
    { domain: "Smart Grids & Renewable Energy", topics: "Demand response; load forecasting; energy management; grid optimization; renewable integration" },
    { domain: "Human-Computer Interaction (HCI)", topics: "User interfaces; UX design; brain-computer interfaces; haptics; conversational AI; accessibility" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content Area (Left 3 columns) */}
      <div className="lg:col-span-3 flex flex-col gap-6">

        {/* AIMS & SCOPE */}
        {activeTab === "Aims & Scope" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
                Aims & Scope
              </h3>
              <h4 className="text-base font-bold text-[#0B4A8F] mb-2">Aims</h4>
              <p className="text-sm text-gray-800 leading-relaxed mb-4">
                The Journal of Federated and Distributed AI (JFDAI) aims to serve as a premier international forum for the dissemination of high-quality, reproducible research in federated learning, distributed artificial intelligence, and interconnected computing systems.
              </p>
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#2D6DB5] mb-6">
                <p className="text-xs text-gray-700">
                  <strong>Advance Decentralized Intelligence</strong> – To promote research that enables collaborative machine learning without centralizing sensitive data.
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Bridge Disciplines</strong> – To foster cross-pollination between federated learning, distributed systems, cybersecurity, wireless communications, and embedded computing.
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Ensure Reproducibility</strong> – To mandate transparent methodologies, code sharing, and data availability wherever possible.
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Support Open Science</strong> – To provide immediate open access to all published research, accelerating discovery and real-world deployment.
                </p>
                <p className="text-xs text-gray-700">
                  <strong>Welcome Sound Science</strong> – To evaluate submissions based on technical rigor and methodological soundness, not subjective novelty.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#0B4A8F] mb-3">Scope</h4>
              <p className="text-sm text-gray-800 leading-relaxed mb-4">
                JFDAI publishes original research articles and comprehensive review papers covering theoretical foundations, algorithmic advances, system architectures, and practical applications in the following domains:
              </p>
              <div className="border border-gray-200 rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-[#0B4A8F] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold w-[220px]">Domain</th>
                      <th className="px-4 py-2 text-left font-bold">Specific Topics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {scopeDomains.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-4 py-2.5 font-semibold text-gray-900 border-r border-gray-100">{row.domain}</td>
                        <td className="px-4 py-2.5 text-gray-700">{row.topics}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#0B4A8F] mb-3">Specific Focus Areas</h4>
              <ul className="list-disc pl-5 text-xs text-gray-700 space-y-2">
                <li><strong>Federated Learning & Foundation Models</strong> – Synergies between large language models (LLMs) and federated learning paradigms</li>
                <li><strong>Reproducible Federated Learning</strong> – Benchmarking, standardized evaluation protocols, and open-source frameworks</li>
                <li><strong>Communication-Efficient Distributed Learning</strong> – Compression techniques, quantization, and sparse communication strategies</li>
                <li><strong>Privacy-Preserving Machine Learning</strong> – Differential privacy, secure aggregation, homomorphic encryption, and trust-aware systems</li>
                <li><strong>Real-World Deployments</strong> – Case studies and large-scale implementations of federated and distributed AI in production environments</li>
                <li><strong>Resource-Constrained Learning</strong> – On-device and edge intelligence for IoT, wearable, and embedded systems</li>
                <li><strong>Heterogeneity in Distributed Systems</strong> – Handling non-IID data, device variability, and system heterogeneity</li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#0B4A8F] mb-3">Article Types Accepted</h4>
              <div className="border border-gray-200 rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-[#2D6DB5] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold w-[180px]">Article Type</th>
                      <th className="px-4 py-2 text-left font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">Original Research Articles</td>
                      <td className="px-4 py-2.5 text-gray-700">Full-length papers presenting novel contributions, empirical studies, or theoretical advances</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-4 py-2.5 font-semibold text-gray-900">Comprehensive Review Papers</td>
                      <td className="px-4 py-2.5 text-gray-700">Systematic surveys and critical reviews of the state-of-the-art in specific domains</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">AI Application Articles</td>
                      <td className="px-4 py-2.5 text-gray-700">Papers focused on practical deployments, case studies, and real-world applications</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-4 py-2.5 font-semibold text-gray-900">Short Communications</td>
                      <td className="px-4 py-2.5 text-gray-700">Rapid dissemination of preliminary but significant results (optional)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">Registered Reports</td>
                      <td className="px-4 py-2.5 text-gray-700">Pre-registered study protocols with results-agnostic acceptance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#0B4A8F] mb-2">Scope Summary</h4>
              <p className="text-xs text-gray-700 italic leading-relaxed bg-blue-50/50 p-3 border border-blue-100">
                JFDAI publishes open access, peer-reviewed research at the intersection of federated learning, distributed AI, and interconnected computing systems. We welcome methodologically sound contributions across AI/ML, deep learning, wireless communications, cyber-physical systems, IoT, embedded computing, cybersecurity, data analytics, and robotics — with a special focus on reproducibility, efficiency, and real-world deployment.
              </p>
            </div>
          </section>
        )}

        {/* EDITORIAL BOARD */}
        {activeTab === "Editorial Board" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Editorial Board
            </h3>

            <div>
              <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-3">Editor-in-Chief</h4>
              <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <span className="font-bold text-gray-900 text-base">{editorialBoard.eic.name}</span>
                  <span className="block text-xs text-gray-600 font-semibold">{editorialBoard.eic.affiliation}</span>
                </div>
                <div className="text-right flex flex-col items-start md:items-end gap-1">
                  {editorialBoard.eic.emails.map((email, idx) => (
                    <a key={idx} href={`mailto:${email}`} className="text-xs text-blue-600 hover:underline">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-3">Associate Editors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editorialBoard.aes.map((ae, idx) => (
                  <div key={idx} className="bg-gray-50/50 p-3 border border-gray-100 flex flex-col justify-between gap-2">
                    <div>
                      <span className="font-bold text-gray-900">{ae.name}</span>
                      <span className="block text-xs text-gray-600">{ae.affiliation}</span>
                    </div>
                    <a href={`mailto:${ae.email}`} className="text-xs text-blue-600 hover:underline">
                      {ae.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-3">Managing Editor</h4>
              <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <span className="font-bold text-gray-900">{editorialBoard.managing.name}</span>
                  <span className="block text-xs text-gray-600 font-semibold">{editorialBoard.managing.affiliation}</span>
                </div>
                <a href={`mailto:${editorialBoard.managing.email}`} className="text-xs text-blue-600 hover:underline">
                  {editorialBoard.managing.email}
                </a>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 text-xs text-gray-700 rounded">
              <strong>Notice:</strong> Additional board members are actively being confirmed and will be added to this listing within 30 days.
            </div>
          </section>
        )}

        {/* FOR AUTHORS */}
        {activeTab === "For Authors" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              For Authors
            </h3>

            <p className="text-sm text-gray-800 leading-relaxed">
              Thank you for considering the Journal of Federated and Distributed AI (JFDAI) for your work. This page provides a summary of our requirements for publication. Please read these instructions carefully before submitting your manuscript to ensure a smooth and efficient process.
            </p>

            <div className="flex flex-col gap-6 text-[14px]">

              {/* 1. Aims & Scope */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">1. Aims & Scope</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  JFDAI publishes original research articles, comprehensive review papers, and AI application articles covering the intersection of federated learning, distributed AI systems, privacy-preserving machine learning, and related interconnected computing technologies. Before submitting, please confirm that your manuscript fits within our detailed Scope & Aims and that it is of broad interest to the computer science community.
                </p>
              </div>

              {/* 2. Article Types Accepted */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">2. Article Types Accepted</h4>
                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <thead className="bg-gray-100 font-bold">
                      <tr>
                        <th className="px-3 py-2 text-left w-[160px] border-r border-gray-200">Article Type</th>
                        <th className="px-3 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Research Article</td>
                        <td className="px-3 py-2 text-gray-600">Full-length papers presenting novel contributions, empirical studies, or theoretical advances with rigorous methodology</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Literature Review</td>
                        <td className="px-3 py-2 text-gray-600">Systematic surveys and critical reviews of the state-of-the-art, identifying gaps and future directions</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">AI Application Article</td>
                        <td className="px-3 py-2 text-gray-600">Papers focused on practical deployments, case studies, and real-world applications with reproducible results</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Registered Report</td>
                        <td className="px-3 py-2 text-gray-600">Pre-registered study protocols with results-agnostic acceptance</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Data Report</td>
                        <td className="px-3 py-2 text-gray-600">Descriptions of new curated datasets or major extensions to existing datasets of value to the research community</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-red-600 font-semibold mt-2">
                  * Note: JFDAI does not accept Hypothesis Papers, Commentaries, Opinion Pieces, or Case Studies.
                </p>
              </div>

              {/* 3. Peer Review Criteria */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">3. Peer Review Criteria</h4>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                  JFDAI evaluates submissions based on an objective determination of scientific and methodological soundness—not on subjective determinations of novelty, impact, or perceived importance.
                </p>
                <div className="border border-gray-200 rounded overflow-hidden mb-2">
                  <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <thead className="bg-gray-100 font-bold">
                      <tr>
                        <th className="px-3 py-2 text-left w-[160px] border-r border-gray-200">Criterion</th>
                        <th className="px-3 py-2 text-left">Key Questions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Basic Reporting</td>
                        <td className="px-3 py-2 text-gray-600">Is the submission clearly written? Does it include sufficient introduction, background, and appropriate references? Are figures and tables clear and relevant?</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Experimental Design</td>
                        <td className="px-3 py-2 text-gray-600">Is the research question clearly defined? Are methods described with sufficient detail to be reproducible? Was the investigation conducted rigorously?</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Validity of Findings</td>
                        <td className="px-3 py-2 text-gray-600">Do the conclusions follow from the results? Are claims appropriately supported by evidence? For theoretical results, are proofs clear and correct?</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 border border-gray-100 flex flex-col gap-1">
                  <span>• Decisions are not based on perceived impact or novelty</span>
                  <span>• Replication studies are welcome if the rationale and added value are clearly described</span>
                  <span>• Null findings are considered if the methodology is sound</span>
                </div>
              </div>

              {/* 4. Submission Requirements */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-3">4. Submission Requirements</h4>

                <div className="flex flex-col gap-3 pl-3">
                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.1 Language and Style</h5>
                    <p className="text-xs text-gray-600">
                      Language: English only. Manuscripts must be clear, unambiguous, and technically correct. Poorly written manuscripts will be returned to the author without review. Professional English editing is strongly recommended for non-native speakers.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.2 Manuscript Format and Structure</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      JFDAI accepts submissions in LaTeX, Word, or PDF format. General formatting guidelines include: single column, single line spacing, 10-12 point font (Times or similar), continuous line numbers, and page numbers in the footer.
                      <br />
                      <strong>Suggested Structure:</strong> Title page (title, authors, affiliations, ORCIDs, contact), Abstract (max 300 words), Introduction, Methods, Results, Discussion, Conclusion, Acknowledgements (no funding info), References, Figures and Tables.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.3 Data and Code Availability</h5>
                    <p className="text-xs text-gray-600">
                      JFDAI is committed to reproducible science. Authors are required to make their data and code available upon publication. Data must be deposited in recognized public repositories, and source codes must be shared via platforms like GitHub or Zenodo. For AI Application articles, a <code>.txt</code> README file describing the code/data structure is required.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.4 Figures and Tables</h5>
                    <div className="border border-gray-200 rounded overflow-hidden my-2 max-w-xl">
                      <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50 font-bold">
                          <tr>
                            <th className="px-3 py-1.5 text-left border-r border-gray-200 w-[140px]">Requirement</th>
                            <th className="px-3 py-1.5 text-left">Specification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Resolution</td>
                            <td className="px-3 py-2 text-gray-600">Color: &ge;300 dpi; Grayscale: &ge;500 dpi; Line art: &ge;1000 dpi</td>
                          </tr>
                          <tr className="bg-gray-50/50">
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Format</td>
                            <td className="px-3 py-2 text-gray-600">TIFF, EPS, JPEG, PNG, or vector PDF</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">File size</td>
                            <td className="px-3 py-2 text-gray-600">Maximum 20 MB per file</td>
                          </tr>
                          <tr className="bg-gray-50/50">
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Dimensions</td>
                            <td className="px-3 py-2 text-gray-600">Minimum 900 pixels, maximum 3000 pixels on all sides</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Labels</td>
                            <td className="px-3 py-2 text-gray-600">Remove figure titles from image files; titles belong in captions</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.5 References</h5>
                    <p className="text-xs text-gray-600">
                      Use a standard citation format consistently throughout. For references with multiple authors, list all authors (avoid "et al." in the reference list). Recent literature (within the last 5 years) should be well-represented.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.6 Competing Interests, Funding, and Ethics</h5>
                    <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                      <li><strong>Competing Interests:</strong> All authors must declare any financial or non-financial competing interests.</li>
                      <li><strong>Funding Statement:</strong> Funding sources must be declared in a dedicated Funding Statement (not in Acknowledgements).</li>
                      <li><strong>Ethics:</strong> Research must conform to prevailing ethical standards. For human or animal subjects, approval statements are required.</li>
                      <li><strong>Plagiarism:</strong> All submissions are screened for plagiarism. JFDAI does not tolerate plagiarism, data fabrication, or figure manipulation.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">4.7 Generative AI Policy</h5>
                    <p className="text-xs text-gray-600">
                      The use of generative AI tools (e.g., ChatGPT, GitHub Copilot) must be clearly disclosed in the manuscript. AI tools should not be listed as authors. Reviewers are prohibited from uploading manuscripts to generative AI tools.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Submission Process */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">5. Submission Process</h4>
                <div className="pl-3 flex flex-col gap-3">
                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">5.1 How to Submit</h5>
                    <p className="text-xs text-gray-600">
                      All manuscripts must be submitted electronically via our online submission system. Submissions include: manuscript file (LaTeX, Word, or PDF), figures, supplemental files, and cover letter (optional).
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">5.2 What to Expect After Submission</h5>
                    <div className="border border-gray-200 rounded overflow-hidden max-w-xl my-1">
                      <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50 font-bold">
                          <tr>
                            <th className="px-3 py-1.5 text-left border-r border-gray-200">Step</th>
                            <th className="px-3 py-1.5 text-left border-r border-gray-200">Description</th>
                            <th className="px-3 py-1.5 text-left w-[120px]">Timeline</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Initial Check</td>
                            <td className="px-3 py-2 text-gray-600 border-r border-gray-200">Staff verify scope, formatting, and policy compliance</td>
                            <td className="px-3 py-2 text-gray-500 font-medium">3-7 days</td>
                          </tr>
                          <tr className="bg-gray-50/50">
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Editor Assignment</td>
                            <td className="px-3 py-2 text-gray-600 border-r border-gray-200">A Section Editor or Academic Editor is assigned</td>
                            <td className="px-3 py-2 text-gray-500 font-medium">1-3 days</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Peer Review</td>
                            <td className="px-3 py-2 text-gray-600 border-r border-gray-200">Minimum 2 external reviewers are invited</td>
                            <td className="px-3 py-2 text-gray-500 font-medium">4-8 weeks</td>
                          </tr>
                          <tr className="bg-gray-50/50">
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Decision</td>
                            <td className="px-3 py-2 text-gray-600 border-r border-gray-200">Accept / Minor Revision / Major Revision / Reject</td>
                            <td className="px-3 py-2 text-gray-500 font-medium">Varies</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Publication</td>
                            <td className="px-3 py-2 text-gray-600 border-r border-gray-200">Articles published online upon acceptance</td>
                            <td className="px-3 py-2 text-gray-500 font-medium">2-4 weeks</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">5.3 Revision Process</h5>
                    <p className="text-xs text-gray-600">
                      Minor revisions: Submit revised manuscript + response letter. Major revisions: Highlight changes (tracked or colored). Authors have 30-60 days to submit revisions.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-xs mb-1">5.4 Final Acceptance</h5>
                    <p className="text-xs text-gray-600">
                      Authors confirm authorship, approve final version, pay publication charges (if applicable), review PDF proof, and the article goes live with a DOI.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Open Access and Publication Fees */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">6. Open Access and Publication Fees</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  JFDAI is fully open access. All articles are published under the CC BY 4.0 license. Detailed pricing lists, waivers, and discounts are available on our <span onClick={() => onNavigate("Publication Charges")} className="text-blue-600 underline cursor-pointer font-bold">Publication Charges Page</span>.
                </p>
              </div>

              {/* 7. Author Responsibilities */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">7. Author Responsibilities</h4>
                <div className="pl-3 flex flex-col gap-2 text-xs text-gray-600">
                  <p>
                    <strong>7.1 Authorship Criteria:</strong> Substantial contributions to design/acquisition/analysis; drafting or revising; final approval. Supervision or funding alone does not justify authorship.
                  </p>
                  <p>
                    <strong>7.2 Corresponding Author:</strong> Responsible for coordinating communication, co-author consensus, and post-publication queries.
                  </p>
                  <p>
                    <strong>7.3 Submission Admin:</strong> Must be a co-author (third-party agencies are prohibited).
                  </p>
                  <p>
                    <strong>7.4 Equal Contributions:</strong> Up to two authors may be designated as equal first authors.
                  </p>
                  <p>
                    <strong>7.5 Name Change Policy:</strong> Requests are handled confidentially and respectfully. No legal proof is required. Contact the editorial office in confidence.
                  </p>
                </div>
              </div>

              {/* 8. Appeal Process */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">8. Appeal Process</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Submit a formal appeal letter to the Editor-in-Chief with point-by-point responses. Appeals are evaluated by an independent editor. Only one appeal is permitted per manuscript.
                </p>
              </div>

              {/* 9. Contact Information */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">9. Contact Information</h4>
                <div className="border border-gray-200 rounded overflow-hidden max-w-md">
                  <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <thead className="bg-gray-50 font-bold">
                      <tr>
                        <th className="px-3 py-1.5 text-left border-r border-gray-200">Purpose</th>
                        <th className="px-3 py-1.5 text-left">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Editorial inquiries</td>
                        <td className="px-3 py-2 text-blue-600">editorial_office@jfdai.in</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Submission support</td>
                        <td className="px-3 py-2 text-blue-600">editorial_office@jfdai.in</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Copyediting inquiries</td>
                        <td className="px-3 py-2 text-blue-600">editorial_office@jfdai.in</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Fee/waiver inquiries</td>
                        <td className="px-3 py-2 text-blue-600">editorial_office@jfdai.in</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 10. Additional Resources */}
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">10. Additional Resources</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Additional policy declarations and template packages can be accessed directly from our <span onClick={() => onNavigate("Resources")} className="text-blue-600 underline cursor-pointer font-bold">Resources Section</span>.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* FOR REVIEWERS */}
        {activeTab === "For Reviewers" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              For Reviewers
            </h3>

            <div className="text-[14px] text-gray-800 leading-relaxed flex flex-col gap-6 font-sans">
              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">Reviewer Guidelines</h4>
                <p className="text-xs text-gray-700">
                  As a peer reviewer for JFDAI, your feedback is critical in maintaining the scientific integrity and publishing standards of our community. Reviewers are expected to keep all manuscripts confidential and disclose any conflicts of interest immediately to the assigning editor.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] border-l-4 border-[#2D6DB5] pl-2 mb-2">Workflow & Policies</h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-2 mt-2">
                  <li><strong>Review model:</strong> Multiple rounds (first review &rarr; minor/major revision &rarr; final decision).</li>
                  <li><strong>Conflict of Interest Detection:</strong> Automated filters check for common co-authorships, institutional affiliations, and matching email domains.</li>
                  <li><strong>Reviewer Assignment:</strong> Evaluated manually by the Associate Editor and automatically optimized via topic matching.</li>
                  <li><strong>Track Chairs:</strong> Dedicated track chairs coordinate review pools for complex sub-disciplines (e.g., Deep Learning, Federated Learning).</li>
                  <li><strong>Desk Rejection:</strong> Allowed by authority of the Editor-in-Chief for out-of-scope or substandard submissions.</li>
                  <li><strong>Shepherding:</strong> Enabled and supported by editors for papers with strong potential but needing substantial revisions.</li>
                </ul>
              </div>

              {/* Review Evaluation Portal Simulation */}
              <div className="border border-gray-200 p-4 rounded bg-gray-50">
                <h4 className="font-bold text-[#0B4A8F] text-sm mb-3">✏️ Online Review Evaluation Panel</h4>
                {reviewSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-3 text-xs font-semibold">
                    ✓ Thank you, {reviewerName || "Reviewer"}! Your review evaluation has been recorded and submitted to the Associate Editor.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Reviewer Name</label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          required
                          className="w-full text-xs p-2 border border-gray-300 bg-white focus:outline-[#0B4A8F]"
                          placeholder="Dr. Alice Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Recommendation</label>
                        <select
                          value={reviewerRec}
                          onChange={(e) => setReviewerRec(e.target.value)}
                          className="w-full text-xs p-2 border border-gray-300 bg-white"
                        >
                          <option>Accept as is</option>
                          <option>Minor Revisions</option>
                          <option>Major Revisions</option>
                          <option>Reject</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Technical Quality</label>
                        <select
                          value={reviewerQuality}
                          onChange={(e) => setReviewerQuality(e.target.value)}
                          className="w-full text-xs p-2 border border-gray-300 bg-white"
                        >
                          <option>Excellent</option>
                          <option>Good</option>
                          <option>Marginal</option>
                          <option>Unacceptable</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Novelty & Significance</label>
                        <select
                          value={reviewerNovelty}
                          onChange={(e) => setReviewerNovelty(e.target.value)}
                          className="w-full text-xs p-2 border border-gray-300 bg-white"
                        >
                          <option>High</option>
                          <option>Moderate</option>
                          <option>Low / None</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Comments to Authors (Confidential review details)</label>
                      <textarea
                        value={reviewerComments}
                        onChange={(e) => setReviewerComments(e.target.value)}
                        required
                        rows={4}
                        className="w-full text-xs p-2 border border-gray-300 bg-white focus:outline-[#0B4A8F]"
                        placeholder="Detail the strengths, weaknesses, and specific requested changes..."
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-[#0B4A8F] hover:bg-[#2D6DB5] text-white font-bold text-xs uppercase transition-colors">
                      Submit Review Report
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

        {/* INDEXING */}
        {activeTab === "Indexing" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Indexing
            </h3>

            <div className="text-[14px] text-gray-800 leading-relaxed flex flex-col gap-4 font-sans">
              <p>
                To maximize the global research footprint, JFDAI is working diligently with key database indexes. All articles receive immediate Crossref registration and individual Digital Object Identifiers (DOIs).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border border-green-200 bg-green-50/30 p-4 rounded">
                  <h4 className="font-bold text-green-800 text-sm flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600"></span>
                    Directory of Open Access Journals (DOAJ)
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Full Indexing. JFDAI complies with the high quality controls and open-access policies required by DOAJ.
                  </p>
                </div>
                <div className="border border-green-200 bg-green-50/30 p-4 rounded">
                  <h4 className="font-bold text-green-800 text-sm flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600"></span>
                    Google Scholar
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Full Indexing. Automated crawlers capture and parse JFDAI papers to count author citations in real-time.
                  </p>
                </div>
                <div className="border border-green-200 bg-green-50/30 p-4 rounded">
                  <h4 className="font-bold text-green-800 text-sm flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600"></span>
                    Crossref (DOI Association)
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Full Registration. Every metadata schema is registered in the Crossref global citation ledger upon publication.
                  </p>
                </div>
                <div className="border border-amber-200 bg-amber-50/30 p-4 rounded">
                  <h4 className="font-bold text-amber-800 text-sm flex items-center gap-1">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Scopus Indexing
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Evaluation Pending. JFDAI will submit its evaluation dossier to the Scopus board following the publication of its initial volumes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ETHICS & POLICIES */}
        {activeTab === "Ethics & Policies" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Ethics & Policies
            </h3>

            <div className="text-[14px] text-gray-800 leading-relaxed flex flex-col gap-5 font-sans">
              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">COPE Compliance & Publication Ethics</h4>
                <p className="text-xs text-gray-600">
                  JFDAI is committed to maintaining absolute ethical standards. We adopt the guidelines set by the Committee on Publication Ethics (COPE). Any conflict of interest, duplicate submission, or plagiarism will be thoroughly investigated according to the COPE Flowcharts.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">Plagiarism Policy</h4>
                <p className="text-xs text-gray-600">
                  We maintain a zero-tolerance policy for academic plagiarism. Every submission is analyzed via professional text-matching engines. Similarity scores higher than 15% (or any instance of copy-pasted blocks without attribution) will lead to immediate rejection.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">Generative AI Policy</h4>
                <p className="text-xs text-gray-600">
                  The use of generative AI tools (e.g., ChatGPT, GitHub Copilot) must be clearly disclosed in the manuscript. AI tools should not be listed as authors. Reviewers are prohibited from uploading manuscripts to generative AI tools.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">Competing Interests</h4>
                <p className="text-xs text-gray-600">
                  All authors must declare any financial or non-financial competing interests in their manuscripts. If no conflicts exist, please state: "The authors declare no competing interests."
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">Funding Statement</h4>
                <p className="text-xs text-gray-600">
                  Funding sources must be declared in a dedicated Funding Statement within the manuscript (do not place this information inside the Acknowledgements section).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">Ethics Requirements</h4>
                <p className="text-xs text-gray-600">
                  Research must conform to prevailing ethical standards. For human or animal subjects, formal ethical approval statements from corresponding institutional review boards are mandatory.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* PUBLICATION CHARGES */}
        {activeTab === "Publication Charges" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Publication Charges
            </h3>

            <div className="text-[14px] text-gray-800 leading-relaxed flex flex-col gap-4 font-sans">
              <p>
                To provide immediate, worldwide open access and cover editorial costs (digital hosting, indexing, and typesetting), JFDAI charges a flat Article Processing Charge (APC) for accepted manuscripts. There are no submission fees.
              </p>

              <div className="border border-gray-200 rounded overflow-hidden my-2 max-w-xl">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-[#0B4A8F] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold">Article Type</th>
                      <th className="px-4 py-2 text-right font-bold">Standard APC Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100">Research Article</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-700">To be determined (Sponsor covered Year 1)</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100">Literature Review</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-700">To be determined</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100">AI Application Article</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-700">To be determined</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-100">Data Report</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-700">To be determined</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-sm mb-1">Fee Waivers and Discounts</h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1.5 mt-2">
                  <li><strong>Low-Income Waiver:</strong> Waivers are available for authors from low-income countries as defined by the World Bank classifications.</li>
                  <li><strong>Early-Career Support:</strong> Early-career researchers may be eligible for discounts upon request to the editorial office.</li>
                  <li><strong>Reviewer Credits:</strong> Reviewers and editors earn credits toward future publications in JFDAI.</li>
                  <li><strong>Funding Status:</strong> Funding for open access APCs has been identified. JFDAI targets low APC or diamond Open Access.</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ADDITIONAL RESOURCES */}
        {activeTab === "Resources" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Additional Resources
            </h3>

            <div className="text-[14px] text-gray-800 leading-relaxed flex flex-col gap-5 font-sans">

              <div>
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">Manuscript Templates</h4>
                <p className="text-xs text-gray-600 mb-2">
                  Use our templates to format your initial and revised submissions.
                </p>
                <div className="flex gap-3">
                  <button className="px-3 py-1.5 bg-[#2D6DB5] hover:bg-[#0B4A8F] text-white text-xs font-bold uppercase transition-colors">
                    📄 MS Word Template (.docx)
                  </button>
                  <button className="px-3 py-1.5 bg-[#2D6DB5] hover:bg-[#0B4A8F] text-white text-xs font-bold uppercase transition-colors">
                    💾 LaTeX Template (Overleaf)
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">FAIR Data Principles</h4>
                <p className="text-xs text-gray-600">
                  JFDAI encourages adherence to the <strong>FAIR</strong> (Findable, Accessible, Interoperable, Reusable) principles for shared datasets, supporting open-source accessibility and model evaluation.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1">COPE Guidelines</h4>
                <p className="text-xs text-gray-600">
                  JFDAI follows the <strong>Committee on Publication Ethics (COPE)</strong> guidelines for addressing publication misconduct and resolving duplicate submission disputes.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        {activeTab === "Contact" && (
          <div className="flex flex-col gap-6">

            {/* Support contacts info panel */}
            <section className="bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-5 uppercase tracking-wider font-serif">
                Contact Us
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px]">
                {/* Email directory */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-[#0B4A8F] text-sm mb-2">Support Contacts</h4>
                    <div className="border border-gray-200 overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-bold border-r border-gray-200 text-gray-600 uppercase tracking-wide text-[10px]">Purpose</th>
                            <th className="px-3 py-2 text-left font-bold text-gray-600 uppercase tracking-wide text-[10px]">Contact Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Editorial inquiries</td>
                            <td className="px-3 py-2"><a href="mailto:editorial_office@jfdai.in" className="text-blue-600 hover:underline">editorial_office@jfdai.in</a></td>
                          </tr>
                          <tr className="bg-gray-50/50">
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Submission support</td>
                            <td className="px-3 py-2"><a href="mailto:editorial_office@jfdai.in" className="text-blue-600 hover:underline">editorial_office@jfdai.in</a></td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Copyediting inquiries</td>
                            <td className="px-3 py-2"><a href="mailto:editorial_office@jfdai.in" className="text-blue-600 hover:underline">editorial_office@jfdai.in</a></td>
                          </tr>
                          <tr className="bg-gray-50/50">
                            <td className="px-3 py-2 font-semibold text-gray-800 border-r border-gray-200">Fee / waiver inquiries</td>
                            <td className="px-3 py-2"><a href="mailto:editorial_office@jfdai.in" className="text-blue-600 hover:underline">editorial_office@jfdai.in</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0B4A8F] text-xs uppercase mb-1 tracking-wide">Journal Office</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Journal of Federated and Distributed AI (JFDAI)<br />
                      Madras Engineering College<br />
                      Chennai, Tamil Nadu, India
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 text-xs text-gray-700">
                    <strong className="text-[#0B4A8F]">Response Time:</strong> Our editorial office
                    handles general inquiries within <strong>2 business days</strong>.
                  </div>
                </div>

                {/* Map / visual placeholder */}
                <div className="flex flex-col gap-3">
                  <div className="bg-[#BFD4EA] border border-[#2D6DB5]/30 p-6 flex flex-col items-center justify-center gap-2 h-full min-h-[180px]">
                    <svg className="w-10 h-10 text-[#0B4A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-[#0B4A8F] font-bold text-sm text-center">All submissions go directly to</p>
                    <p className="font-extrabold text-[#0B4A8F] text-base">editorial_office@jfdai.in</p>
                    <p className="text-xs text-gray-600 text-center mt-1">
                      Use the form below to send a message securely.
                      Your details are never shared with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Full contact form */}
            <ContactForm />

          </div>
        )}

        {/* SEARCH RESULTS */}
        {activeTab === "Search Results" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Search Results
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Showing matching elements for: <span className="font-bold text-[#0B4A8F]">"{searchQuery}"</span>
            </p>
            <div className="bg-gray-50 p-6 text-center border border-dashed border-gray-300 text-gray-500 text-sm">
              No matching records found. Submissions will launch soon. For scopes and topics, please consult the <span onClick={() => onNavigate("Aims & Scope")} className="text-blue-600 underline cursor-pointer font-bold">Aims & Scope</span> tab.
            </div>
          </section>
        )}

        {/* PUBLISHED ARTICLES */}
        {activeTab === "Published Articles" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Published Articles Archive
            </h3>
            <div className="bg-gray-50 p-6 text-center border border-dashed border-gray-300 text-gray-500 text-sm">
              No articles published yet. We are currently accepting proposal reviews. For author guidelines, see the <span onClick={() => onNavigate("For Authors")} className="text-blue-600 underline cursor-pointer font-bold">For Authors</span> page.
            </div>
          </section>
        )}

        {/* CURRENT ISSUE */}
        {activeTab === "Current Issue" && (
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Current Issue
            </h3>
            <div className="bg-gray-50 p-6 text-center border border-dashed border-gray-300 text-gray-500 text-sm">
              Volume 1, Issue 1 is currently in preparation. Submissions are open.
            </div>
          </section>
        )}
      </div>

      {/* Sidebar (Right 1 column) */}
      <div className="flex flex-col gap-6">
        {/* JOURNAL METRICS */}
        <div className="bg-white border border-gray-200 p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-[#0B4A8F] border-b-2 border-[#0B4A8F] pb-2 mb-3 uppercase tracking-wider">
            Journal Metrics
          </h4>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-50 p-2 border border-gray-100">
              <span className="block text-lg font-extrabold text-[#2D6DB5]">&lt; 7 days</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Desk Review</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100">
              <span className="block text-lg font-extrabold text-[#2D6DB5]">4-8 weeks</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Review Cycle</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100">
              <span className="block text-lg font-extrabold text-[#2D6DB5]">25-30%</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Accept Rate (Est)</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100">
              <span className="block text-lg font-extrabold text-[#2D6DB5]">CC BY 4.0</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Open Access</span>
            </div>
          </div>
        </div>

        {/* QUICK RESOURCES */}
        <div className="bg-white border border-gray-200 p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-[#0B4A8F] border-b-2 border-[#0B4A8F] pb-2 mb-3 uppercase tracking-wider">
            Quick Resources
          </h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onNavigate("For Authors")}
              className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
            >
              📝 Submit Manuscript
            </button>
            <button
              onClick={() => onNavigate("Resources")}
              className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
            >
              📄 Manuscript Templates
            </button>
            <button
              onClick={() => onNavigate("Ethics & Policies")}
              className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
            >
              ⚖️ Publication Ethics
            </button>
            <button
              onClick={() => onNavigate("Publication Charges")}
              className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
            >
              💰 Open Access Fees (APC)
            </button>
          </div>
        </div>

        {/* INDEXING LOGOS */}
        <div className="bg-white border border-gray-200 p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-[#0B4A8F] border-b-2 border-[#0B4A8F] pb-2 mb-3 uppercase tracking-wider">
            Indexing & Archiving
          </h4>
          <div className="flex flex-wrap gap-2 justify-center py-2 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
              Google Scholar
            </div>
            <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
              Crossref (DOI)
            </div>
            <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
              DOAJ
            </div>
            <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
              Scopus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
