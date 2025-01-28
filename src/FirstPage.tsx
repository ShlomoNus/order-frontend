import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./slices/categories";
import { AppDispatch, RootState } from "./store";

function FirstPage() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const loading = useSelector((state: RootState) => state.categories.loading);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {categories.map((category) => (
        <div key={category.name}>
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default FirstPage;
