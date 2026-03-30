import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import SquareButton from './SquareButton';
import { useNavigate } from 'react-router-dom';

export default function AllEntries(props) {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axiosInstance.get('/journal', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEntries(res.data);
      } catch (err) {
        console.error('Error fetching journal entries', err);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4" style={{color: props.mode==='dark'?'white':'black'}}>Your Journal Entries</h2>
      <div className="row">
        {entries.map((entry) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={entry.id}>
            <SquareButton
              title={entry.title}
              preview={entry.content}
              entryId={entry.id}
            />
          </div>
        ))}
      </div>
      <button className="btn mx-2 my-1" style={{ backgroundColor: '#7a23b5', color: 'white' }} onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
}
