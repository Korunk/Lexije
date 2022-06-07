import React from "react"

export const timeBar = () => {

    return (
        <div className="ukazatel-uspechu">
            <div className="ukazatel-uspechu__ramecek">
                <div
                    className="ukazatel-uspechu__postup"
                    style={{
                        width: `${status.hunger}%`,
                        backgroundColor: 'limegreen'}) >
                </div>
            </div>
        </div>
    )
} 