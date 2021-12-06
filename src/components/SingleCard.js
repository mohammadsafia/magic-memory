import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img draggable={false} className="front" src={card.src} alt="card front"/>
                <img  draggable={false}  onClick={handleClick} className="back" src="/img/cover.png" alt="card back"/>
            </div>
        </div>
    )
}