
const  Test1= () => {

    return(
        <div>
            <button
                onClick={()=>{


                    const run_ = async  (url = "", data = {}) => {
                        console.log('=== data ',data)
                        const response = await fetch(url, {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                            mode: "cors", // no-cors, *cors, same-origin
                            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data), // body data type must match "Content-Type" header
                        })
                            .then((response) => response.json())
                            .then((data) => {

                                console.log('=== data  ',data)
                                return data

                            })


                        console.log('=== response  ',response)

                        return response

                    }
                    const ret2 = run_('http://localhost:3100/items',
                        {item:'iii', id:555}
                    )
                    console.log('== ret2 ',ret2)
                }
                }
            > TEST </button>
        </div>
    )

}

export {Test1}
