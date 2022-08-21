import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfiles, getPublications } from '../../api';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [ profile, setProfile ] = useState([]);
  const [ publications, setPublications ] = useState([]) 
  useEffect(() => {
    if(id) {
      fetchProfile();
    }
  }, [id])

  const fetchProfile = async() => {
    try {
      // getProfiles
      const profileData = await client.query(getProfiles, {id}).toPromise();
      console.log('profileData: ', profileData);
      setProfile(profileData.data.profiles.items[0]);
      console.log('profile', profile)  

      // getPublications
      const publicationData = await client.query(getPublications, { id }).toPromise()
      console.log('publicationdata', publicationData)
      setPublications(publicationData.data.publications.items);
      console.log('publications', publications)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div>{id}</div>
      <div>{profile.bio}</div>
      {
        profile.picture && (profile.picture.original.url.includes('lens.infura-ipfs.io') === true)
          ? ( <Image 
              src={profile.picture.original.url} 
              alt={profile.name} 
              width={200}
              height={200} /> )   
          : ( 
            <Image
              src="https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
              alt="No Image" 
              width={200}
              height={200} /> )
      }
      <div>{profile.handle}</div>
      <div>
        {
          publications.map((publication, index) => {
            return (
              <div key={index}>
                {publication.appId}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}