import Card from "./Card.jsx";
function Features() {
  return (
    <div className="py-16 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          FEATURES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Targeted Reach"
            img="card1.png"
            text="Connect with influencers who speak directly to your target audience.  "
          />
          <Card title="Measurable Results" img="card2.png" text="Track campaign performance with detailed analytics and insights." />
          <Card
            title="Local Impact"
            img="card3.png"
            text="Build authentic connections within your local community.               "
          />
        </div>
      </div>
    </div>
  );
}
export default Features;
