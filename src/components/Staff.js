import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Staff() {
    let roleId = localStorage.getItem('roleId');
    let token = localStorage.getItem('token');
    let navigate = useNavigate()
    useEffect(() => {
        if (roleId != 2) {
            navigate('*');
        } else if (token == null) {
            navigate('*');
        }
    });

    return (
<div className='max-w-4x2' style={{marginLeft: '15rem'}}>
        <h2> Welcome Staff</h2>
</div>
    )
}
