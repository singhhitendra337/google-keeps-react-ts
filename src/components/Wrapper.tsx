import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  return (
    <div className="wrapper" style={{ display: "flex", marginTop: 63 }}>
      {props.children}
    </div>
  );
};

export default Wrapper;
