

function CustomerPage(){

    const list = [
        {
            id : 1,
            firstname : "Mr",
            lastname : "Sok",
            gender : "male",
            dob : "01/01/2000",
        },
        {
            id : 1,
            firstname : "Mr",
            lastname : "Sa",
            gender : "male",
            dob : "01/01/2000",
        },
        {
            id : 1,
            firstname : "Mr",
            lastname : "So",
            gender : "male",
            dob : "01/01/2000",
        }
    ]

    // get list from api
    return (
        <div>
            <h1>CustomerPage</h1>
            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th style={{textAlign:"left"}}>Id</th>
                        <th style={{textAlign:"left"}}>firstname</th>
                        <th style={{textAlign:"left"}}>lastname</th>
                        <th style={{textAlign:"left"}}>gender</th>
                        <th style={{textAlign:"left"}}>Dob</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item,index)=>(
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.gender}</td>
                            <td>{item.dob}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default CustomerPage;