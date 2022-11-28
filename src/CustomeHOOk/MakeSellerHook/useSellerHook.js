import { useEffect, useState } from "react"

const useSellerHook = email => {
    const [seller, setseller] = useState(false);
    const [setsellerloadding, setsetsellerloadding] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://resale-server-woad.vercel.app/users/seller/${email}`)
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