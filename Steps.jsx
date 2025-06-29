import React from 'react';

const steps = [
  { step: "1", title: "Upload", description: "Choose an image you want to remove the background from." },
  { step: "2", title: "Process", description: "Our AI quickly removes the background for you." },
  { step: "3", title: "Download", description: "Get your new image with transparent background instantly." },
];

const Steps = () => {
  return (
    <section className="py-12 bg-gray-100 text-center">
      <h3 className="text-3xl font-bold mb-8">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map(({ step, title, description }) => (
          <div key={step} className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl font-extrabold text-indigo-600 mb-4">{step}</div>
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;