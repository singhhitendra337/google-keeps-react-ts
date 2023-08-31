import { ReactNode } from "react";

interface wrapperprops {
  children: ReactNode;
}

const Wrapper = (props: wrapperprops) => {
  return (
    <div className="wrapper" style={{ display: "flex", marginTop: 63 }}>
      {props.children}
    </div>
  );
};

export default Wrapper;
