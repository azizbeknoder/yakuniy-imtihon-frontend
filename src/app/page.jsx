import Header from "@/components/header";
import ProductList from "../components/product-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Bizning do'konimizga xush kelibsiz
        </h1>
        <ProductList />
      </div>
    </main>
  );
}
