import React, { useState, useEffect } from 'react';
import { client, recommendProfiles } from '../api';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(()=>{
    fetchProfiles()
  },[])

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfiles).toPromise();
      setProfiles(response.data.recommendedProfiles);
      console.log('profiles', profiles);
      for(let i = 0; i < profiles.length; i ++) {
        profiles[i].picture
      }
    } catch (error) {
      console.log({error});
    }
  }
  return (
    <div>홍홍
    {
      profiles.map((profile,index) => (
        <Link key={index} href={`/profile/${profile.id}`}>
          <a>
            <div style={{marginBottom: "100px"}}>
              {
                profile.coverPicture && (profile.coverPicture.original.url.includes('lens.infura-ipfs.io') === true)
                  ? (
                  <Image
                    src={profile.coverPicture.original.url}
                    alt={profile.name}
                    width={200} 
                    height={200} />
                  ) : (
                  <Image
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
                    alt="No Image" 
                    width={200} 
                    height={200} />
                  )
                }
              <h4>{profile.handle}</h4>
              <p>{profile.bio}</p>
              <hr/>
            </div>
          </a>
        </Link>
      ))
    }
    </div>
  );
}