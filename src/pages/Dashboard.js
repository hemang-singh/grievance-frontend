import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // FIXED LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/grievances`, {
        headers: { Authorization: token }
      });
      setList(res.data);
    } catch (err) {
      console.log("Fetch error");
    }
  };

  const addGrievance = async () => {
    await axios.post(
      `${API}/grievances`,
      {
        title,
        description: "No description",
        category: "Other"
      },
      { headers: { Authorization: token } }
    );

    setTitle("");
    fetchData();
  };

  const startEdit = (g) => {
    setEditId(g._id);
    setTitle(g.title);
  };

  const updateGrievance = async () => {
    await axios.put(
      `${API}/grievances/${editId}`,
      { title },
      { headers: { Authorization: token } }
    );

    setEditId(null);
    setTitle("");
    fetchData();
  };

  const deleteGrievance = async (id) => {
    await axios.delete(`${API}/grievances/${id}`, {
      headers: { Authorization: token }
    });

    fetchData();
  };

  const searchGrievance = async () => {
    if (!search.trim()) {
      fetchData();
      return;
    }

    try {
      const res = await axios.get(
        `${API}/grievances/search?title=${search}`,
        { headers: { Authorization: token } }
      );

      setList(res.data);
    } catch (err) {
      setList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">

      <div className="header">
        <h2>🎓 Student Grievance System</h2>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="card-box">
        <input
          className="input"
          placeholder="Enter grievance title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {editId ? (
          <button className="update-btn" onClick={updateGrievance}>
            Update
          </button>
        ) : (
          <button className="add-btn" onClick={addGrievance}>
            Submit
          </button>
        )}
      </div>

      <div className="search-box">
        <input
          className="input"
          placeholder="Search grievance..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-btn" onClick={searchGrievance}>
          Search
        </button>

        <button className="search-btn" onClick={fetchData}>
          Reset
        </button>
      </div>

      <div className="list">
        {list.length === 0 ? (
          <p className="empty">No grievances found</p>
        ) : (
          list.map((g) => (
            <div className="item" key={g._id}>
              <div>
                <h4>{g.title}</h4>
                <p>Status: {g.status || "Pending"}</p>
              </div>

              <div className="actions">
                <button className="edit" onClick={() => startEdit(g)}>
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteGrievance(g._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
