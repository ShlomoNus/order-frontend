export default function OrderedCategory() {
  return (
    <div>
      <div className="header-z w-40 h-20 bg-blue-800 flex flex-row justify-center items-center rounded text-white">
        <h4>title</h4>
      </div>
      <ul className="flex flex-col items-end pr-5">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  );
}
