function Card(props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center">
        <img
          alt="card-img"
          src={"/img/" + props.img}
          className="h-40 w-full object-cover object-center rounded-t-lg"
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {props.title}
        </h3>
      </div>
      <div className="p-3">
        <p className="text-gray-600 leading-relaxed">
          {props.text}
        </p>
      </div>
    </div>
  );
}
export default Card;
