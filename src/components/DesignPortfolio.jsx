import React, { useState } from 'react';
import projectsData from './projectsData';  

const DesignPortfolio = () => {
  // Define categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI Projects' },
    { id: 'ux & cognition', label: 'UX Analysis & Cognition' },
  ];

  const [projects, setProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    if (project.type === 'multi-pdf' && project.title === 'Mood Tales') {
      setSelectedPdf(project.contentUrls[0].url);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedPdf(null);
    setIsFullScreen(false);
  };

  const changePdf = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setIsFullScreen(false);
  };
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
          <div className={`bg-white rounded-lg w-full max-w-5xl max-h-screen overflow-auto transition-all duration-300 ${
            isFullScreen ? 'fixed inset-0 w-screen h-screen max-w-none max-h-none z-50' : ''
          }`}>
            <div className="sticky top-0 bg-white flex justify-between items-center border-b border-gray-200 p-4 z-10">
              <h2 className="text-xl font-bold truncate">{selectedProject.title}</h2>
              <div className="flex items-center space-x-2">
                {(selectedProject.type === 'pdf' || selectedProject.type === 'multi-pdf') && (
                  <button 
                    onClick={toggleFullScreen}
                    className="ml-4 text-gray-500 hover:text-gray-700 p-2"
                    aria-label={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  >
                    {isFullScreen ? '↙️' : '↗️'}
                  </button>
                )}
                <button 
                  onClick={handleCloseModal}
                  className="ml-4 text-gray-500 hover:text-gray-700 p-2"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className={`p-4 md:p-6 flex-grow overflow-auto ${
              isFullScreen ? 'flex flex-col' : ''
            }`}>
              <p className="mb-6 text-gray-700">{selectedProject.description}</p>
               {/* PDF Viewer */}
              
            {(selectedProject.type === 'pdf' || selectedProject.type === 'multi-pdf') && (
              <div className="bg-gray-100 p-4 rounded flex flex-col items-center">
                {selectedProject.type === 'multi-pdf' && (
                  <div className="mb-4 flex space-x-4 overflow-x-auto">
                    {selectedProject.contentUrls.map((pdf, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-full whitespace-nowrap ${
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
                )}
                <div className="flex items-center w-full">
                  <a 
                    href={selectedProject.contentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Open in New Tab
                  </a>
                </div>

              <div className={`w-full bg-white shadow rounded overflow-hidden ${
                    isFullScreen ? 'fixed inset-0 z-50 w-screen h-screen' : ''
                  }`}>
                    <div className={`sticky top-0 bg-white flex justify-between items-center border-b border-gray-200 p-4 z-10 ${
                      !isFullScreen && 'hidden'
                    }`}>
                      <h2 className="text-xl font-bold truncate">{selectedProject.title}</h2>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={toggleFullScreen}
                          className="ml-4 text-gray-500 hover:text-gray-700 p-2"
                          aria-label="Exit Full Screen"
                        >
                          ↙️
                        </button>
                        <button 
                          onClick={handleCloseModal}
                          className="ml-4 text-gray-500 hover:text-gray-700 p-2"
                          aria-label="Close"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <iframe 
                      // src={selectedProject.contentUrl}
                      src={selectedPdf || selectedProject.contentUrl} 
                      width="100%" 
                      height={isFullScreen ? '95%' : '600px'}
                      title={selectedProject.title}
                      className={isFullScreen ? 'h-[calc(100%-60px)]' : ''}
                      allowFullScreen
                    />

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