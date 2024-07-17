const CampoCheckbox = ({ label, checked, onChange }) => {
    return (
        <div className="campo-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label>{label}</label>
        </div>
    );
}

export default CampoCheckbox;