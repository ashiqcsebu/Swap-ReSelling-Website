import { useEffect, useState } from "react"

const useSellerHook = email => {
    const [seller, setseller] = useState(false);
    const [setsellerloadding, setsetsellerloadding] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setseller(data.isSeller);
                    setsetsellerloadding(false);
                })
        }
    }, [email])
    return [seller, setsellerloadding]
}

export default useSellerHook;