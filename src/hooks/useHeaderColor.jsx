// import { useEffect } from "react";
// import { useInterface } from "../context/InterfaceContext";

// export function useHeaderColor({ ref }) {
//   const { dispatch } = useInterface();

//   useEffect(() => {
//     if (!ref) return;
//     console.log(ref);
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         console.log(entry);
//         if (entry.isIntersecting)
//           dispatch({ type: "header/fixed/transparent" });
//         else dispatch({ type: "header/fixed/colored" });
//       },
//       { rootMargin: "-71px" }
//     );
//     observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [dispatch, ref]);
// }
