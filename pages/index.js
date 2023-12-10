import Link from "next/link";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-sm p-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Vem aí um projeto daora</h2>
        <p className="text-gray-600">
          Essa é a primeira página da implementação do{" "}
          <Link href="https://tabnews.com.br" className="underline">
            TabNews
          </Link>{" "}
          para o <strong>curso.dev</strong>
        </p>
      </div>
    </div>
  );
}

export default Home;
