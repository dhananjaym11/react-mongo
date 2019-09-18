import React from 'react';
import { Button } from 'reactstrap';

export default function FormList(props) {
    return (
        <div className="form-list">
            {props.lists.map(list => (
                <div key={list._id} className="clearfix">
                    <span>Name: {list.name} - Age: {list.age}</span>
                    <Button color="info" onClick={() => props.editFormData(list._id)}>
                        Edit
                    </Button>
                    <Button color="danger" onClick={() => props.deleteFormData(list._id)}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    )
}