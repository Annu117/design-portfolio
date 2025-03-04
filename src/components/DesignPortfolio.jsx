import React, { useState } from 'react';

const DesignPortfolio = () => {
  // Define categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI Projects' },
    // { id: 'ux', label: 'UX Analysis' },
    { id: 'ux & cognition', label: 'UX Analysis & Cognition' },
    // { id: 'other', label: 'Other Projects' }
  ];

  // Your actual projects based on the assets you described
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Mood Tales",
      description: "Emotion Aware Interactive storytelling AI for children",
      category: "ai",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/mood_tales.png",
      contentUrl: "/assets/MoodTales_Presentation.pdf",
    },
    {
      id: 2,
      title: "Interaction Analysis",
      description: "Analysis of good and bad design principles in interfaces, Ergonomics/Human factors for Design Assignment 1",
      category: "ux & cognition",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/efd_1.png",
      contentUrl: "/assets/InteractionAnalysis_Presentation.pdf",
    },
    {
      id: 3,
      title: "AI Agents",
      description: "Transforming Enterprise Workflows research paper",
      category: "ai",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/ai_agents.png",
      contentUrl: "/assets/AIAgents_Paper.pdf",
    },
    {
      id: 4,
      title: "MakeMyTrip Website Interaction Scenario",
      description: "Cognition of information processing and design Assignment 1",
      category: "ux & cognition",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/cipd_1.png",
      contentUrl: "/assets/MakeMyTrip_InteractionScenario.pdf",
    },
    {
      id: 5,
      title: "Design Principles Review",
      description: "Assignment 2: Design principles review of MakeMyTrip",
      category: "ux & cognition",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/cipd_2.png",
      contentUrl: "/assets/MakeMyTrip_DesignPrinciples.pdf",
    },
    {
      id: 6,
      title: "Task Analysis - Norman's Interaction Cycle",
      description: "Assignment 4: MakeMyTrip Website Analysis",
      category: "ux & cognition",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/cipd_4.png",
      contentUrl: "/assets/MakeMyTrip_TaskAnalysis.pdf",
    },
    {
      id: 7,
      title: "Impact of Attention and Multitasking on UI Design",
      description: "Cognition project on effective UI design",
      category: "ux & cognition",
      type: "multi-pdf",
      thumbnailUrl: "/assets/thumbnail/cipd_project.png",
      contentUrls: [
        {label: "Presentation", url: "/assets/AttentionMultitasking_Presentation.pdf"},
        {label: "Report", url: "/assets/AttentionMultitasking_Report.pdf"},
      ]
    },
    {
      id: 8,
      title: "FOOD DETECTION AND ANALYSIS",
      description: "Website for making informed dietary choices",
      category: "ai",
      type: "pdf",
      thumbnailUrl: "/assets/thumbnail/food_detection.png",
      contentUrl: "/assets/FoodDetection_Website.pdf",
    },
    // {
    //   id: 9,
    //   title: "Self Growth - Yoga",
    //   description: "Yoga poster design",
    //   category: "other",
    //   type: "image",
    //   thumbnailUrl: "/assets/SelfGrowth_Yoga.png",
    //   imageUrl: "/assets/SelfGrowth_Yoga.png",
    // },
    {
      id: 10,
      title: "DL Based Image Analysis for CDC",
      description: "Crossmatch workflow and technical architecture",
      category: "ai",
      type: "image-gallery",
      thumbnailUrl: "/assets/CDC_Workflow.png",
      images: [
        {label: "Technical Architecture", url: "/assets/CDC_TechnicalArchitecture.png"},
        {label: "Workflow Diagram", url: "/assets/CDC_Workflow.png"},
        
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    if (project.type === 'multi-pdf') {
      setSelectedPdf(project.contentUrls[0].url);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedPdf(null);
  };

  const changePdf = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Design Portfolio</h1>
        <p className="text-lg text-gray-600 mt-2">
          A showcase of my design work, research and academic projects
        </p>
      </header>

      {/* Category tabs */}
      <div className="max-w-6xl mx-auto mb-6 overflow-x-auto">
        <div className="flex space-x-2 border-b border-gray-200 whitespace-nowrap pb-2">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeCategory === category.id 
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:translate-y-px"
            onClick={() => handleProjectSelect(project)}
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img 
                src={project.thumbnailUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {project.category === 'ai' ? 'AI Project' : 
                  //  project.category === 'ux' ? 'UX Analysis' : 
                   project.category === 'ux & cognition' ? 'UX Analysis & Cognition' : 'Other'}
                </span>
                <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full ml-2">
                  {project.type === 'pdf' ? 'PDF' : 
                   project.type === 'multi-pdf' ? 'Multiple PDFs' : 
                   project.type === 'image' ? 'Image' : 'Image Gallery'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing selected project */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-screen overflow-auto">
            <div className="sticky top-0 bg-white flex justify-between items-center border-b border-gray-200 p-4 z-10">
              <h2 className="text-xl font-bold truncate">{selectedProject.title}</h2>
              <button 
                onClick={handleCloseModal}
                className="ml-4 text-gray-500 hover:text-gray-700 p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <p className="mb-6 text-gray-700">{selectedProject.description}</p>
              
              {/* PDF Viewer */}
              {(selectedProject.type === 'pdf') && (
                <div className="bg-gray-100 p-4 rounded flex flex-col items-center">
                  <div className="w-full bg-white shadow rounded overflow-hidden p-4 text-center">
                    <a 
                      href={selectedProject.contentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Open PDF
                    </a>
                    <p className="mt-4 text-gray-500">
                      The PDF viewer requires additional dependencies. Click the button above to open the PDF in a new tab.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Multiple PDFs */}
              {selectedProject.type === 'multi-pdf' && (
                <div className="bg-gray-100 p-4 rounded flex flex-col items-center">
                  <div className="mb-4 flex space-x-4">
                    {selectedProject.contentUrls.map((pdf, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-full ${
                          selectedPdf === pdf.url
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600 border border-blue-600'
                        }`}
                        onClick={() => changePdf(pdf.url)}
                      >
                        {pdf.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="w-full bg-white shadow rounded overflow-hidden p-4 text-center">
                    <a 
                      href={selectedPdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Open Selected PDF
                    </a>
                    <p className="mt-4 text-gray-500">
                      The PDF viewer requires additional dependencies. Click the button above to open the PDF in a new tab.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Single Image */}
              {selectedProject.type === 'image' && (
                <div className="flex justify-center">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="max-w-full rounded shadow-lg" 
                  />
                </div>
              )}
              
              {/* Image Gallery */}
              {selectedProject.type === 'image-gallery' && (
                <div className="space-y-8">
                  {selectedProject.images.map((image, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-lg font-medium">{image.label}</h3>
                      <img 
                        src={image.url} 
                        alt={image.label}
                        className="max-w-full rounded shadow-lg" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPortfolio;