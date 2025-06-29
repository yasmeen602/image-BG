import React from 'react';

const testimonials = [
  { name: "Jane Doe", feedback: "Super easy to use and the results were amazing!" },
  { name: "John Smith", feedback: "This saved me hours of Photoshop work." },
];

const Testimonial = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h3 className="text-3xl font-bold mb-8">What Users Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map(({ name, feedback }, index) => (
          <div key={index} className="p-6 border border-gray-200 rounded-lg shadow">
            <p className="italic text-gray-700 mb-2">"{feedback}"</p>
            <p className="font-semibold text-gray-900">- {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;