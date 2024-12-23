import "./tooltip.scss";

const Tooltip = ({ children, label, bgColor = "black", color }) => {
    return (
        <div className="tooltip-wrapper relative">
            <div
                className="tooltip-label"
            >
                {label}
            </div>
            {children}
        </div>
    )
}
export default Tooltip;