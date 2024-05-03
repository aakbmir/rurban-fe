// const StyledFormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function FormRow({ label, error, children, mb = "2em", mandatory }) {
  return (
    <div style={{ marginBottom: mb }}>
      {label && (
        <label
          style={{ fontSize: "14px", color: "#344054" }}
          htmlFor={children.id}
        >
          {label} {mandatory && <span>*</span>}
        </label>
      )}
      {children}
      {error && (
        <span style={{ fontSize: "1.2rem", color: "red" }}>{error}</span>
      )}
    </div>
  );
}

export default FormRow;
