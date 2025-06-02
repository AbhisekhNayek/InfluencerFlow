function About() {
  return (
    <div className="py-24 w-full">
      <div className="about-scroll h-16 w-full"></div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              alt="about"
              src={`/img/img1.png`}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ABOUT</h2>
            <p className="text-gray-600 leading-relaxed">
              MicroMatch is an influencer marketing platform that connects
              businesses with nano- and micro-influencers, prioritizing multiple
              small influencers per campaign for higher engagement. It enables
              geo-targeted influencer selection to create a stronger
              psychological impact on the target audience.


            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
