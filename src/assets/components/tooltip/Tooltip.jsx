import "./tooltip.scss";

const Tooltip = ({ children, label }) => {
    return (
        <div className="tooltip-wrapper relative">
            <div className="tooltip-label">
                {label}
            </div>
            {children}
        </div>
    )
}
export default Tooltip;