import DefaultLayout from "@/layouts/default";
import ProductList from "@/components/products/ProductList";

export default function ProductsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block text-center justify-center">
         <ProductList/>
        </div>
      </section>
    </DefaultLayout>
  );
}
