import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

export default function DonorReg() {
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    // Fetch cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://localhost:7031/api/Cities');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    // Fetch areas based on selected city
    useEffect(() => {
        const fetchAreas = async () => {
            if (selectedCity) {
                try {
                    const response = await fetch(`https://localhost:7031/api/Areas/GetAllArea?cid=${selectedCity}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch areas');
                    }
                    const data = await response.json();
                    setAreas(data);
                } catch (error) {
                    console.error('Error fetching areas:', error);
                }
            }
        };

        fetchAreas();
    }, [selectedCity]);

    // Initial state for form
    const init = {
        donorType: '',
        fName: '',
        lName: '',
        orgName: '',
        licenseNo: '',
        contactNo: '',
        email: '',
        website: '',
        status: '',
        areaId: '',
        pwd: '',
        uName: '',
        roleId: '',
    };

    // Reducer to manage form state
    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [info, dispatch] = useReducer(reducer, init);

    // Handle form submission
    const sendData = (e) => {
        e.preventDefault();

        const dataToSend = {
            donorType: info.donorType,
            fName: info.fName,
            lName: info.lName,
            orgName: info.orgName,
            licenseNo: info.licenseNo,
            contactNo: info.contactNo,
            email: info.email,
            website: info.website,
            status: "Active",
            areaId: +info.areaId,
            uIdNavigation: {
                pwd: info.pwd,
                uName: info.uName,
                areaId: info.areaId,
                roleId: 2,
                status: "Active"
            }
        };

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };

        fetch("https://localhost:7031/api/Registration/saveDonor", reqdata)
            .then(resp => {
                if (!resp.ok) {
                    return resp.json().then(error => {
                        throw new Error(JSON.stringify(error.errors));
                    });
                }
                return resp.json();
            })
            .then(data => console.log("Success:", data))
            .catch(error => console.error("Error:", error.message));
    };

    return (
        <div className="registration-page" style={{ 
            backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?charity)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div className="registration-card card shadow-lg p-4 mb-5 bg-white rounded" style={{ 
                maxWidth: '600px', 
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px',
                animation: 'fadeIn 1s ease-in-out'
            }}>
                <h1 className="text-center mb-4" style={{ color: '#4e73df', fontWeight: 'bold' }}>Donor Registration</h1>
                <div className="form-container">
                    <form onSubmit={sendData}>
                        <div className="form-group mb-3">
                            <label htmlFor="uName" className="form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="uName"
                                name="uName"
                                value={info.uName}
                                onChange={(e) => dispatch({ type: 'update', fld: 'uName', val: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="pwd" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="pwd"
                                name="pwd"
                                value={info.pwd}
                                onChange={(e) => dispatch({ type: 'update', fld: 'pwd', val: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="donorType" className="form-label">Donor Type:</label>
                            <select
                                id="donorType"
                                className="form-control"
                                value={info.donorType}
                                onChange={(e) => dispatch({ type: 'update', fld: 'donorType', val: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select a donor type</option>
                                <option value="Single">Single</option>
                                <option value="Organization">Organization</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="fName" className="form-label">First Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fName"
                                name="fName"
                                value={info.fName}
                                onChange={(e) => dispatch({ type: 'update', fld: 'fName', val: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="lName" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lName"
                                name="lName"
                                value={info.lName}
                                onChange={(e) => dispatch({ type: 'update', fld: 'lName', val: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="orgName" className="form-label">Organization Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="orgName"
                                name="orgName"
                                value={info.orgName}
                                onChange={(e) => dispatch({ type: 'update', fld: 'orgName', val: e.target.value })}
                                disabled={info.donorType !== 'Organization'}
                                required={info.donorType === 'Organization'}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="licenseNo" className="form-label">License No:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="licenseNo"
                                name="licenseNo"
                                value={info.licenseNo}
                                onChange={(e) => dispatch({ type: 'update', fld: 'licenseNo', val: e.target.value })}
                                disabled={info.donorType !== 'Organization'}
                                required={info.donorType === 'Organization'}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={info.email}
                                onChange={(e) => dispatch({ type: 'update', fld: 'email', val: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="contactNo" className="form-label">Contact:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactNo"
                                name="contactNo"
                                value={info.contactNo}
                                onChange={(e) => dispatch({ type: 'update', fld: 'contactNo', val: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="website" className="form-label">Organization Website:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="website"
                                name="website"
                                value={info.website}
                                onChange={(e) => dispatch({ type: 'update', fld: 'website', val: e.target.value })}
                                disabled={info.donorType !== 'Organization'}
                                required={info.donorType === 'Organization'}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="city" className="form-label">City:</label>
                            <select
                                id="city"
                                className="form-control"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a city</option>
                                {cities.map((city) => (
                                    <option key={city.cityId} value={city.cityId}>
                                        {city.cityName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="areaId" className="form-label">Area:</label>
                            <select
                                id="areaId"
                                className="form-control"
                                value={info.areaId}
                                onChange={(e) => dispatch({ type: 'update', fld: 'areaId', val: e.target.value })}
                                disabled={!selectedCity} // Disable if no city is selected
                                required
                            >
                                <option value="" disabled>Select an area</option>
                                {areas.map((area) => (
                                    <option key={area.areaId} value={area.areaId}>
                                        {area.areaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="button-group d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary" style={{ 
                                backgroundColor: '#4e73df', 
                                borderColor: '#4e73df',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => dispatch({ type: 'reset' })}
                                style={{
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
