import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { client, getProfiles, getPublications } from '../../api';
import Layout from '../../components/layout'
import styles from '../../styles/Profile.module.scss'
import Image from 'next/image';
import Post from '../../components/post'
import Platform from '../../components/platform'
import { ethers } from 'ethers';
import ABI from '../../ABI/contractABI.json'

const CONTRACT_ADDRESS = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"

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

  async function followUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    )
    try {
      const tx = contract.follow(
        [id],[0x0]
      )
      await tx.wait();
      console.log("followed user successfully...");
    } catch(error){
      console.log(error);
      }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.inner}>
          {
            profile.coverPicture && (profile.coverPicture.original.url.includes('lens.infura-ipfs.io') === true)
            ? ( <div className={styles.coverImage}>
                  <Image 
                  src={profile.coverPicture.original.url} 
                  alt={profile.name} 
                  width={`${1240}`}
                  height={400} 
                  style={{ borderRadius: 10}} />
              </div>
              ) : (  
            <div className={styles.AlterCoverImage}>
              <span>No  Cover Image</span>
            </div> 
            )
          }
          <div className={styles.profile_container}>
            {
              profile.picture && (profile.picture.original.url.includes('lens.infura-ipfs.io') === true)
                ? ( <div className={styles.image_container}>
                    <Image 
                      src={profile.picture.original.url} 
                      alt={profile.name} 
                      width={150}
                      height={150} 
                      style={{ borderRadius: 10}} />
                      
                  </div> )   
                : ( 
                  <Image
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
                    alt="No Image" 
                    width={200}
                    height={200} /> )
            }
            <div className={styles.information_container}>
              <div className={styles.person_container}>
                <span className={styles.handle}>{profile.handle}</span>
                <span className={styles.name}>{profile.name}</span>
                <button className={styles.followButton} onClick={followUser}>Follow</button> <br />
                <span className={styles.bio}>{profile.bio}</span>
 
              </div>
              {profile.stats
                ? <div className={styles.follow_container}>
                    <div>
                      <span className={styles.type}>Follower</span><span className={styles.value}>{profile.stats.totalFollowers}</span>
                    </div>
                    <div>
                      <span className={styles.type}>Following</span><span className={styles.value}>{profile.stats.totalFollowing}</span>
                    </div>
                    <div>
                      <span className={styles.type}>Posts</span><span className={styles.value}>{profile.stats.totalPosts}</span>
                    </div>
                    <div>
                      <span className={styles.type}>Collections</span><span className={styles.value}>{profile.stats.totalCollect}</span>
                    </div>
                  </div>
                : null }
 
            </div>
          </div>
          <div>
            <Platform title={profile} />
          </div>
          <div>
            <Post contents={publications} />
          </div>
        </div>
      </div>
    </Layout>
  )
}