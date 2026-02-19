"use client";

export default function Home() {
  const handleClick = () => {
    console.log("Hello");
  };

  return (
    <div className="flex bg-gray-500 ">
      <button className="h-10px w-10px" onClick={handleClick}>add</button>
    </div>
  );
}
