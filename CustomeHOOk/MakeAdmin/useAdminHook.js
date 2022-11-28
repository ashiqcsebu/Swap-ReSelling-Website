import { useEffect, useState } from "react"

const useAdminHook = email => {
    const [admin, setadmin] = useState(false);
    const [adminLoading, setadminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setadmin(data.isAdmin);
                    setadminLoading(false);
                })
        }
    }, [email])
    return [admin, adminLoading]
}

export default useAdminHook;