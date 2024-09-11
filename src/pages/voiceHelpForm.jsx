
import React from 'react';
import axios from 'axios';
import qs from 'qs'; 
import '@fortawesome/fontawesome-free/css/all.min.css';



const VoiceHelpButton = () => {
  const handleCall = async () => {
    try {
      const data = { to: '+918236014408' }; 
      const response = await axios.post(
        'https://foodie-git-main-vikas8236s-projects.vercel.app/voice/voice-help/',
        qs.stringify(data), // Convert data to x-www-form-urlencoded
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // Handle response
      alert('Call initiated with SID: ' + response.data.call_sid);
    } catch (error) {
      // Handle errors
      console.error('There was an error initiating the call!', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg text-center max-w-sm'>
        <h2 className='text-3xl font-bold mb-4'>
          Need Assistance with Your Food Order?
        </h2>
        <p className='text-gray-600 mb-6'>
          Our support team is here to help you with any issues or questions you have about your food order. Click the button below to call us.
        </p>
        <button
          onClick={handleCall}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center focus:outline-none focus:shadow-outline'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12h.01M12 12h.01M9 12h.01M6 12h.01M21 21l-6-6 3-3m0 0l-3-3m3 3H3m6-6l6-6m0 0L9 9m3-3H3"
            />
          </svg>
          Call for Help
        </button>
      </div>
    </div>
  );
};

export default VoiceHelpButton;

