import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Task Management System`;
    }, [title])
}

export default useTitle;