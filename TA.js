import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from './Header';

const tabs = [
  { title: 'SMC ADMIN', key: 'topAdmin' },
  { title: 'ACADEMIC HEADS', key: 'academicHeads' },
  { title: 'PROGRAM COORDINATORS', key: 'programCoordinators' },
  { title: 'RVM SISTERS', key: 'rvmSisters' },
  { title: 'OFFICE HEADS', key: 'officeHeads' },
  { title: 'SERVICE HEADS', key: 'serviceHeads' },
  { title: 'HED FACULTIES', key: 'hedFaculties' },
  { title: 'NON-TEACHING PERSONNEL', key: 'nonTeaching' },
]

const hedDepartments = [
  { name: 'College of Arts And Sciences', key: 'c1' },
  { name: 'College of Business Administration and Accountancy', key: 'c2' },
  { name: 'College of Education', key: 'c3' },
  { name: 'College of Hospitality and Tourism Management', key: 'c4' },
  { name: 'College of Criminology', key: 'c5' },
  { name: 'College of Nursing', key: 'c6' },
  { name: 'College of Computer Studies', key: 'c7' },
  { name: 'College of Engineering', key: 'c8' },
];

const TA = () => {
  const [facultyData, setFacultyData] = useState({});
  const [activeTab, setActiveTab] = useState('topAdmin');
  const [headerTitle, setHeaderTitle] = useState('Top Administration');
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState([]); 
  const [statusHEData, setStatusHEData] = useState([]); 
  const [statusPCData, setStatusPCData] = useState([]); 
  const [statusSHData, setStatusSHData] = useState([]); 
  const [statusRVMData, setStatusRVMData] = useState([]); 
  const [statusOHData, setStatusOHData] = useState([]); 
  const [statusNTPData, setStatusNTPData] = useState([]); 


//////ADMINSTRATION
//////
//////
//////
//////
const handleStatusSelection = async (status) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-status?status=Administration`
    );
    const data = await response.json();
    setStatusData(data);
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};

//Academic Heads
const handleStatusHESelection = async (status) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-status?status=Higher Education`
    );
    const data = await response.json();
    setStatusHEData(data); 
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};



//////Office Heads
//////
//////
const handleStatusOHSelection = async (status) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-status?status=Office Heads`
    );
    const data = await response.json();
    setStatusOHData(data); 
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};
//////RVM
//////
//////
const handleStatusRVMSelection = async (status) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-status?status=RVM Sisters`
    );
    const data = await response.json();
    setStatusRVMData(data); 
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};
//////NTP
//////
///// 
const handleStatusNTPSelection = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/ntp`
    );
    const data = await response.json();
    setStatusNTPData(data); 
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};

/////Program Coordinators
//////
//////
const handleStatusPCSelection = async (status) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-status?status=Program Coordinators`
    );
    const data = await response.json();
    setStatusPCData(data); 
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};

//Service Heads
const handleStatusSHSelection = async (status) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-status?status=Service Heads`
    );
    const data = await response.json();
    setStatusSHData(data); 
  } catch (error) {
    console.error('Error fetching status data:', error);
  } finally {
    setIsLoading(false);
  }
};

//DEPARTMENT
  const handleDepartmentSelection = async () => {
    setIsLoading(true);
    try {
      const departmentPromises = hedDepartments.map(async (department) => {
        const response = await fetch(`https://smcyearbookdb-smcdbyearbook.up.railway.app/api/faculty-department?departmentName=${department.name}`);
        const data = await response.json();
        return { name: department.name, data };
      });
      const departmentsData = await Promise.all(departmentPromises);
      const newFacultyData = {};
      departmentsData.forEach((department) => {
        newFacultyData[department.name] = department.data;
      });
  
      setFacultyData(newFacultyData); 
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const chunkArray = (array, size) =>
    array.reduce((chunks, item, index) => {
      const chunk = Math.floor(index / size);
      if (!chunks[chunk]) {
        chunks[chunk] = [];
      }
      chunks[chunk].push(item);
      return chunks;
    }, []);
  
  const handleTabPress = (tab) => {
    setActiveTab(tab.key);
    setHeaderTitle(tab.title);
  };

  useEffect(() => {
    if (activeTab === 'hedFaculties') {
      handleDepartmentSelection();
    }
  }, [activeTab]);
  useEffect(() => {
    handleStatusSelection('Administration');
  }, []);
  useEffect(() => {
    if (activeTab === 'academicHeads') {
      handleStatusHESelection('Higher Education');
    }
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === 'programCoordinators') {
      handleStatusPCSelection('Program Coordinators');
    }
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === 'serviceHeads') {
      handleStatusSHSelection('Service Heads');
    }
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === 'rvmSisters') {
      handleStatusRVMSelection('RVM Sisters');
    }
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === 'officeHeads') {
      handleStatusOHSelection('Office Heads');
    }
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === 'nonTeaching') {
      handleStatusNTPSelection();
    }
  }, [activeTab]);
  

  const renderContent = () => {
    switch (activeTab) {
      case 'topAdmin':
        return (
          <ScrollView style={styles.scrollContainer}>
            {isLoading ? (
              <Text style={styles.noContent}>Loading...</Text>
            ) : (
              statusData.length > 0 ? (
                <View style={styles.gridContainer}>
                  {statusData.map((admin, index) => (
                    <View key={index} style={styles.adminCard}>
                      {admin.image ? (
                        <Image source={{ uri: admin.image }} style={styles.adminLogo} />
                      ) : (
                        <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                      )}
                      <Text style={styles.name}>{admin.name}</Text>
                      <Text style={styles.position}>{admin.position}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noContent}>No data found</Text>
              )
            )}
          </ScrollView>
        );
      
        case 'academicHeads':
          return (
            <ScrollView style={styles.scrollContainer}>
              {isLoading ? (
                <Text style={styles.noContent}>Loading...</Text>
              ) : (
                statusHEData.length > 0 ? (
                  <View style={styles.gridContainer1}>
                    {statusHEData.map((head, index) => (
                      <View key={index} style={styles.adminCard1}>
                        {head.image ? (
                          <Image source={{ uri: head.image }} style={styles.adminLogo} />
                        ) : (
                          <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                        )}
                        <Text style={styles.name}>{head.name}</Text>
                        <Text style={styles.position}>{head.position}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noContent}>No data found</Text>
                )
              )}
            </ScrollView>
          );
        
          case 'programCoordinators':
          return (
            <ScrollView style={styles.scrollContainer}>
              {isLoading ? (
                <Text style={styles.noContent}>Loading...</Text>
              ) : (
                statusPCData.length > 0 ? (
                  <View style={styles.gridContainer2}>
                    {statusPCData.map((head, index) => (
                      <View key={index} style={styles.adminCard2}>
                        {head.image ? (
                          <Image source={{ uri: head.image }} style={styles.adminLogo} />
                        ) : (
                          <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                        )}
                        <Text style={styles.name}>{head.name}</Text>
                        <Text style={styles.position}>{head.position}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noContent}>No data found</Text>
                )
              )}
            </ScrollView>
          );
          case 'rvmSisters':
            return (
              <ScrollView style={styles.scrollContainer}>
              {isLoading ? (
                <Text style={styles.noContent}>Loading...</Text>
              ) : (
                statusRVMData.length > 0 ? (
                  <View style={styles.gridContainer2}>
                    {statusRVMData.map((head, index) => (
                      <View key={index} style={styles.adminCard2}>
                        {head.image ? (
                          <Image source={{ uri: head.image }} style={styles.adminLogo} />
                        ) : (
                          <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                        )}
                        <Text style={styles.name}>{head.name}</Text>
                        <Text style={styles.position}>{head.position}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noContent}>No data found</Text>
                )
              )}
            </ScrollView>
          );
          
            case 'officeHeads':
              return (
                <ScrollView style={styles.scrollContainer}>
                {isLoading ? (
                  <Text style={styles.noContent}>Loading...</Text>
                ) : (
                  statusOHData.length > 0 ? (
                    <View style={styles.gridContainer2}>
                      {statusOHData.map((head, index) => (
                        <View key={index} style={styles.adminCard2}>
                          {head.image ? (
                            <Image source={{ uri: head.image }} style={styles.adminLogo} />
                          ) : (
                            <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                          )}
                          <Text style={styles.name}>{head.name}</Text>
                          <Text style={styles.position}>{head.position}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.noContent}>No data found</Text>
                  )
                )}
              </ScrollView>
            );
            
              case 'serviceHeads':
                return (
                  <ScrollView style={styles.scrollContainer}>
                    {isLoading ? (
                      <Text style={styles.noContent}>Loading...</Text>
                    ) : (
                      <View style={styles.gridContainer5}>
                        {statusSHData.length > 0 ? (
                          statusSHData.map((head, index) => (
                            <View key={index} style={styles.adminCard5}>
                              {head.image ? (
                                <Image source={{ uri: head.image }} style={styles.adminLogo} />
                              ) : (
                                <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                              )}
                              <Text style={styles.name}>{head.name}</Text>
                              <Text style={styles.position}>{head.position}</Text>
                            </View>
                          ))
                        ) : (
                          <Text style={styles.noContent}>No data found</Text>
                        )}
                      </View>
                    )}
                  </ScrollView>
                );
              
            case 'hedFaculties':
              return (
                <ScrollView style={styles.scrollContainer}>
                {isLoading ? (
                  <Text style={styles.noContent}>Loading...</Text>
                ) : (
                  hedDepartments.map((department) => (
                    <View key={department.name} style={styles.departmentContainer}>
                      <Text style={styles.departmentHeader}>{department.name}</Text>
                      {facultyData[department.name] && facultyData[department.name].length > 0 ? (
                        <View style={styles.row}>
                          {facultyData[department.name].map((faculty, index) => (
                            <View key={index} style={styles.adminSection}>
                              {faculty.image ? (
                                <Image source={{ uri: faculty.image }} style={styles.adminLogo} />
                              ) : (
                                <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                              )}
                              <Text style={styles.name}>{faculty.name}</Text>
                              {/*<Text style={styles.position}>{faculty.position}</Text>*/}
                              {/*<Text style={styles.position}>{faculty.department}</Text>*/}
                            </View>
                          ))}
                        </View>
                      ) : (
                        <Text style={styles.noContent}>No faculty data available for {department.name}</Text>
                      )}
                    </View>
                  ))
                )}
              </ScrollView>
              
              );
              case 'nonTeaching':
                return (
                  <ScrollView style={styles.scrollContainer}>
                    {isLoading ? (
                      <Text style={styles.noContent}>Loading...</Text>
                    ) : (
                      <View style={styles.gridContainer5}>
                        {statusNTPData.length > 0 ? (
                          statusNTPData.map((head, index) => (
                            <View key={index} style={styles.adminCard5}>
                              {head.image ? (
                                <Image source={{ uri: head.image }} style={styles.adminLogo} />
                              ) : (
                                <Image source={require('./images/smclogo.png')} style={styles.adminLogo} />
                              )}
                              <Text style={styles.name}>{head.name}</Text>
                              <Text style={styles.position}>{head.department}</Text>
                              <Text style={styles.position}>{head.position}</Text>
                            </View>
                          ))
                        ) : (
                          <Text style={styles.noContent}>No data found</Text>
                        )}
                      </View>
                    )}
                  </ScrollView>
                );
              
              
        default:
          return <Text style={styles.noContent}>No Content Available</Text>;
      }
    };
    
  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.dynamicHeader}>{headerTitle}</Text>

      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          data={tabs}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === item.key && styles.activeTab,
              ]}
              onPress={() => handleTabPress(item)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === item.key && styles.activeTabText,
                ]}
              >
                {item.title}
              </Text>
              {activeTab === item.key && <View style={styles.activeLine} />}
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  adminSection1: {//ntp
    marginLeft: 70,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
    scrollContainer: {
    flex: 1,
    width: '100%',
  },
  adminCard5: {//service
    marginLeft: 75,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  gridContainer5: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridContainer4: {//office
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminCard4: {
    marginLeft: 75,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  gridContainer3: {//rvm
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminCard3: {
    marginLeft: 75,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  gridContainer2: {//program
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminCard2: {
    marginLeft: 75,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  
  gridContainer1: {//academic heads
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminCard1: {
    marginLeft: 75,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adminCard: {
    marginLeft: 75,
    width: '60%',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  dynamicHeader: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 30,
    textAlign: 'center',
  },
  tabsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#24348E',
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingBottom: 5,
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#329AFE',
  },
  activeTab: {
    alignItems: 'center',
  },
  activeLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#329AFE',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  departmentContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  departmentHeader: {
    color: '#fff',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#000080',
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginHorizontal: 10,
  },
  adminSection: {
    width: '31%', 
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: '1%', 
  },
  adminLogo: {
    width: 90,
    height: 130,
    resizeMode: 'contain',
    borderWidth: 3,
    borderColor: '#1C2768',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    elevation: 5, 

  },
  name: {
    marginTop: 5,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  
  },
  position: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',

  },
  noContent: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});



export default TA;
