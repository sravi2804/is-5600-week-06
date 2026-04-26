const Button = ({ text, handleClick, disabled = false }) => {
  return (
    <button
      className="f6 link dim br2 ph3 pv2 mb2 dib white bg-blue bn"
      onClick={handleClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;