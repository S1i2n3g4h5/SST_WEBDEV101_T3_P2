import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from '../services/firebase';
import { toast } from 'react-toastify';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time synchronization with Firestore
  useEffect(() => {
    console.log("Initializing Firestore subscription...");
    
    // Safety timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Firestore subscription timed out. Data may not be synced.");
        setLoading(false);
      }
    }, 5000);

    try {
      const q = query(collection(db, "applications"), orderBy("appliedDate", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("Snapshot received, count:", querySnapshot.size);
        const apps = [];
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() });
        });
        setApplications(apps);
        setLoading(false);
        clearTimeout(timeout);
      }, (error) => {
        console.error("Firestore Error in Listener:", error);
        toast.error("Failed to sync applications: " + error.message);
        setLoading(false);
        clearTimeout(timeout);
      });

      return () => {
        unsubscribe();
        clearTimeout(timeout);
      };
    } catch (err) {
      console.error("Error setting up Firestore query:", err);
      setLoading(false);
      clearTimeout(timeout);
    }
  }, []);

  const addApplication = async (application) => {
    try {
      await addDoc(collection(db, "applications"), {
        ...application,
        bookmarked: false,
        createdAt: new Date().toISOString()
      });
      toast.success("Application added successfully!");
    } catch (error) {
      toast.error("Error adding application");
    }
  };

  const updateApplication = async (id, updatedData) => {
    try {
      const appRef = doc(db, "applications", id);
      await updateDoc(appRef, updatedData);
      toast.success("Application updated!");
    } catch (error) {
      toast.error("Error updating application");
    }
  };

  const deleteApplication = async (id) => {
    try {
      await deleteDoc(doc(db, "applications", id));
      toast.success("Application deleted");
    } catch (error) {
      toast.error("Error deleting application");
    }
  };

  const toggleBookmark = async (id, currentState) => {
    try {
      const appRef = doc(db, "applications", id);
      await updateDoc(appRef, { bookmarked: !currentState });
    } catch (error) {
      toast.error("Error updating bookmark");
    }
  };

  return (
    <ApplicationContext.Provider value={{ 
      applications, 
      loading, 
      addApplication, 
      updateApplication, 
      deleteApplication,
      toggleBookmark
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
};
