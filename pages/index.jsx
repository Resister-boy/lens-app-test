import React, { useState, useEffect } from 'react';
import { client, recommendProfiles } from '../api';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(()=>{
    fetchProfiles()
  },[])

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfiles).toPromise();
      console.log(response)
      setProfiles(response.data.recommendedProfiles);
      console.log(response.data.recommendedProfiles[0].picture.original.url)
    } catch (error) {
      console.log({error});
    }
  }
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.inner}>
            {
              profiles.map((profile, index) => (
                <div key={index} className={styles.user_item}>
                  <div className={styles.item_content}>
                    {/* {
                      profile.picture && (profile.picture.original.url.includes('lens.infura-ipfs.io') === true)
                        ? (
                        <Image
                          src={profile.picture.original.url}
                          alt={profile.name}
                          width={170} 
                          height={170} />
                        ) : (
                        <Image
                          src="https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
                          alt="No Image" 
                          width={170} 
                          height={170} />
                        )
                    } */}
                  <b className={styles.user_name}>{profile.handle}</b>
                  {profile.bio 
                    ? <span className={styles.user_bio}>{profile.bio.length > 70
                      ? `${profile.bio.slice(0, 70)}...`
                      : profile.bio}</span>
                    : <span className={styles.user_bio}>No Bio</span>
                  }
                  <div className={styles.button_container}>
                    <button>Follow</button>
                    <Link href={`/profile/${profile.id}`}>
                      <a>
                        <button>Profile</button>
                      </a>
                    </Link>
                  </div>
                </div>
            </div>
            ))
          }
        </div>
      </div>
    </Layout>
  );
}