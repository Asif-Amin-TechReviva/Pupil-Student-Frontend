import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { useOutletContext } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Edit, Save, Cancel, Add, Instagram, Twitter, YouTube, LinkedIn, GitHub, Delete, Visibility } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Apple, Camera, Facebook, Google } from 'iconsax-react';
import { AddSocialMediaAccount, UpdateSocialMediaAccount, DeleteSocialMediaAccount, UpdateStudent, uploadImage } from 'api/myDetails';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import defaultImages from 'assets/images/users/default.png';
import { CallCalling, Dribbble, Gps, Link1, Sms } from 'iconsax-react';
import { PatternFormat } from 'react-number-format';
import { Tooltip } from '@mui/material';
import LogoImageLoader from 'components/PupilLoader';
import CircularLoader from 'components/CircularLoader';

export default function TabProfile() {
  const { studentData, loading, refetch } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [socialMediaEdit, setSocialMediaEdit] = useState(false);
  const [newSocialMedia, setNewSocialMedia] = useState({
    profileName: '',
    profileUrl: '',
    socialMediaType: 'INSTAGRAM'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    profileName: '',
    profileUrl: '',
    socialMediaType: 'INSTAGRAM'
  });

  // Loading states
  const [saveLoading, setSaveLoading] = useState(false);
  const [addSocialLoading, setAddSocialLoading] = useState(false);
  const [updateSocialLoading, setUpdateSocialLoading] = useState(false);
  const [deleteSocialLoading, setDeleteSocialLoading] = useState(false);
  const [showAllSocialAccounts, setShowAllSocialAccounts] = useState(false);
  const [profileImage, setProfileImage] = useState(studentData?.profileImage || defaultImages);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (studentData?.socialMedia) {
      setSocialAccounts(
        studentData.socialMedia.map((account) => ({
          ...account,
          connected: true,
          type: account.socialMediaType
        }))
      );
    }
  }, [studentData]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const response = await uploadImage(file);
      setProfileImage(response?.data?.url);
      console.log(profileImage, 'aaaaaaaa');

      await UpdateStudent({
        id: studentData?.id,
        photo: response?.data?.url
      });
      await refetch();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Extract data from studentData
  const {
    fullName = 'N/A',
    father = 'N/A',
    mother = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    presentAddress = 'N/A',
    DOB = 'N/A',
    schoolId = 'N/A',
    Class = {},
    socialMedia = []
  } = studentData || {};

  const socialMediaColors = {
    INSTAGRAM: '#E1306C',
    LINKEDIN: '#0077B5',
    FACEBOOK: '#1877F2'
  };

  const socialMediaIcons = {
    INSTAGRAM: <Instagram variant="Bold" style={{ color: socialMediaColors.INSTAGRAM }} />,
    LINKEDIN: <LinkedIn variant="Bold" style={{ color: socialMediaColors.LINKEDIN }} />,
    FACEBOOK: <Facebook variant="Bold" style={{ color: socialMediaColors.FACEBOOK }} />
  };
  const syllabusData = [
    { time: '9:00 AM', subject: 'English', },
    { time: '10:00 AM', subject: 'Urdu',  },
    { time: '11:00 AM', subject: 'Mathematics'  },
    { time: '12:00 PM', subject: 'Science'  },
    { time: '1:00 PM', subject: 'Social Science'  },
  ];

  const [socialAccounts, setSocialAccounts] = useState([
    ...socialMedia.map((account) => ({
      type: account.socialMediaType,
      connected: true,
      profileName: account.profileName,
      profileUrl: account.profileUrl,
      id: account.id
    }))
  ]);

  const handleEditAccount = (account) => {
    setEditingAccountId(account.id);
    setEditFormData({
      profileName: account.profileName,
      profileUrl: account.profileUrl,
      socialMediaType: account.socialMediaType || account.type
    });
  };

  const handleRemoveSocial = async (id) => {
    try {
      setDeleteSocialLoading(true);
      await DeleteSocialMediaAccount(id);
      setSocialAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (error) {
      console.error('Failed to remove account:', error);
    } finally {
      setDeleteSocialLoading(false);
    }
  };

  const handleAddSocialMedia = async () => {
    try {
      setAddSocialLoading(true);
      const payload = {
        profileName: newSocialMedia.profileName,
        profileUrl: newSocialMedia.profileUrl,
        socialMediaType: newSocialMedia.socialMediaType
      };

      const addedAccount = await AddSocialMediaAccount(payload);

      setSocialAccounts((prev) => [
        ...prev,
        {
          ...addedAccount,
          connected: true,
          type: addedAccount.socialMediaType
        }
      ]);

      setShowAddForm(false);
      setNewSocialMedia({
        profileName: '',
        profileUrl: '',
        socialMediaType: 'INSTAGRAM'
      });
    } catch (error) {
      console.error('Failed to add account:', error);
    } finally {
      setAddSocialLoading(false);
    }
  };

  const handleUpdateAccount = async () => {
    try {
      setUpdateSocialLoading(true);
      const payload = {
        profileName: editFormData.profileName,
        profileUrl: editFormData.profileUrl,
        socialMediaType: editFormData.socialMediaType
      };

      const updatedAccount = await UpdateSocialMediaAccount(editingAccountId, payload);

      setSocialAccounts((prev) =>
        prev.map((account) =>
          account.id === editingAccountId ? { ...account, ...updatedAccount, type: updatedAccount.socialMediaType } : account
        )
      );

      setEditingAccountId(null);
      setEditFormData({
        profileName: '',
        profileUrl: '',
        socialMediaType: 'INSTAGRAM'
      });
    } catch (error) {
      console.error('Failed to update account:', error);
    } finally {
      setUpdateSocialLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = () => {
    setEditedData({
      fullName: fullName || '',
      father: father || '',
      mother: mother || '',
      DOB: DOB ? new Date(DOB).toISOString().split('T')[0] : '',
      presentAddress: presentAddress || '',
      email: email || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      const payload = {
        id: studentData?.id,
        fullName: editedData.fullName || fullName,
        father: editedData.father || father,
        mother: editedData.mother || mother,
        DOB: editedData.DOB || DOB,
        presentAddress: editedData.presentAddress || presentAddress,
        email: editedData.email || email
      };

      await UpdateStudent(payload);
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderEditableField = (field, value, label, type = 'text') => {
    if (isEditing) {
      if (type === 'date') {
        return (
          <TextField
            fullWidth
            type="date"
            value={editedData[field] || ''}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        );
      }
      return <TextField fullWidth value={editedData[field] || ''} onChange={(e) => handleFieldChange(field, e.target.value)} />;
    }
    return <Typography sx={{ fontWeight: 500 }}>{value || 'N/A'}</Typography>;
  };

  const formatUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  if (loading || saveLoading || addSocialLoading || updateSocialLoading || deleteSocialLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LogoImageLoader />
      </Box>
    );
  }
  return (
    <Grid container spacing={3}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip label="Student" size="small" color="primary" />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        alt="Avatar"
                        size="xl"
                        src={studentData?.photo}
                        sx={{
                          width: 120,
                          height: 120,
                          border: `2px solid ${theme.palette.primary.main}`
                        }}
                      />
                      {isUploading ? (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%'
                          }}
                        >
                          <CircularLoader size={40} />
                        </Box>
                      ) : (
                        <IconButton
                          component="label"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                              backgroundColor: theme.palette.primary.dark
                            }
                          }}
                        >
                          <Camera size={20} />
                          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </IconButton>
                      )}
                    </Box>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{fullName}</Typography>
                      <Typography color="secondary">{father}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ padding: '0px' }}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{Class?.subjects?.length || 0}</Typography>
                      <Typography color="secondary">Subjects</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{socialMedia.length}</Typography>
                      <Typography color="secondary">Social Links</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {/* <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <Sms size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{studentData?.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CallCalling size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">(+91) {studentData?.phone}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Gps size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{studentData?.presentAddress}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid> */}

<Grid item xs={12}>
                  <Typography sx={{ textAlign: 'center', fontWeight: 600, mb: 2 }}>Contact Information</Typography>
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    sx={{ py: 0, textAlign: 'center', '& .MuiListItem-root': { p: 0, py: 1 } }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <Sms size={18} />
                      </ListItemIcon>
                      {/* <ListItemSecondaryAction> */}
                      <Typography >{studentData?.email}</Typography>
                      {/* </ListItemSecondaryAction> */}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CallCalling size={18} />
                      </ListItemIcon>
                      {/* <ListItemSecondaryAction> */}
                      <Typography >(+91) {studentData?.phone}</Typography>
                      {/* </ListItemSecondaryAction> */}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Gps size={18} />
                      </ListItemIcon>
                      {/* <ListItemSecondaryAction> */}
                      <Typography >{studentData?.presentAddress || 'Not added yet'} </Typography>
                      {/* </ListItemSecondaryAction> */}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
          <MainCard
  title={<Typography sx={{ textAlign: 'center', fontWeight: 600 }}>Upcoming Classes</Typography>}
  divider={false}
>
  <Grid container spacing={2}>
    {/* Header row */}
    <Grid item xs={6}>
      <Typography  sx={{ fontWeight: 600,}}>
        Time
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography  sx={{ fontWeight: 600, }}>
        Subject
      </Typography>
    </Grid>

    {/* Data rows */}
    {syllabusData.map((item, index) => (
      <React.Fragment key={index}>
        <Grid item xs={6} display="flex" gap={0.5}>
          <Typography color="text.primary">{item.time}</Typography>
        </Grid>
        <Grid item xs={6} display="flex" gap={0.5}>
          <Typography color="text.primary">{item.subject}</Typography>
        </Grid>
        {index < syllabusData.length - 1 && (
          <Grid item xs={12}>
            <Divider />
          </Grid>
        )}
      </React.Fragment>
    ))}
  </Grid>
</MainCard>

          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard
              title="Personal Details"
              // secondary={
              //   !isEditing ? (
              //     <IconButton onClick={handleEdit}>
              //       <Edit />
              //     </IconButton>
              //   ) : (
              //     <Stack direction="row" spacing={1}>
              //       <IconButton onClick={handleCancel} color="error">
              //         <Cancel />
              //       </IconButton>
              //       <IconButton onClick={handleSave} color="primary">
              //         <Save />
              //       </IconButton>
              //     </Stack>
              //   )
              // }
            >
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        {/* {renderEditableField('fullName', fullName, 'Full Name')} */}
                        <Typography >{fullName}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">School ID</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{schoolId}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>

                        <Typography sx={{ fontWeight: 500 }}>
                          <PatternFormat value={phone} displayType="text" type="text" format="#### ### ###" />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography sx={{ fontWeight: 500 }}>India</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        {/* {renderEditableField('email', email, 'Email')} */}
                        <Typography>{email}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography sx={{ fontWeight: 500 }}>190001</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Address</Typography>
                        {/* {renderEditableField('presentAddress', presentAddress, 'Address')} */}
                        <Typography>{presentAddress}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">DOB</Typography>
                        {/* {renderEditableField('DOB', formatDate(DOB), 'Date of Birth', 'date')} */}
                        <Typography>{formatDate(DOB)}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Father Name</Typography>
                        {/* {renderEditableField('father', father, 'Father Name')} */}
                        <Typography>{father}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Mother Name</Typography>
                        {/* {renderEditableField('mother', mother, 'Mother Name')} */}
                        <Typography>{mother}</Typography>

                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
              {/* {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button variant="outlined" color="error" startIcon={<Cancel />} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSave} disabled={saveLoading}>
                    {saveLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )} */}
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Class Information">
              <List sx={{ py: 0 }}>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Class</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{Class?.name || 'N/A'}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Section</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{studentData?.Section?.name || 'N/A'}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>

          <Grid item xs={12}>
            <MainCard
              title="Social Network"
              secondary={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add fontSize="small" />}
                    onClick={() => {
                      setShowAddForm(!showAddForm);
                      setEditingAccountId(null);
                    }}
                    disabled={showAddForm || socialMediaEdit}
                  >
                    Add
                  </Button>

                  {socialAccounts.length > 0 && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Edit fontSize="small" />}
                      onClick={() => setSocialMediaEdit(!socialMediaEdit)}
                      disabled={showAddForm || editingAccountId || socialMediaEdit}
                      color={socialMediaEdit ? 'primary' : 'inherit'}
                    >
                      Edit
                    </Button>
                  )}
                </Stack>
              }
            >
              <Stack spacing={2}>
                {/* Add new social media form */}
                {showAddForm && (
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper
                    }}
                  >
                    <Stack spacing={2}>
                      <TextField
                        label="Profile Name"
                        value={newSocialMedia.profileName}
                        onChange={(e) => setNewSocialMedia({ ...newSocialMedia, profileName: e.target.value })}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Profile URL"
                        value={newSocialMedia.profileUrl}
                        onChange={(e) => setNewSocialMedia({ ...newSocialMedia, profileUrl: e.target.value })}
                        fullWidth
                        size="small"
                        placeholder="https://example.com/username"
                      />
                      <FormControl fullWidth size="small">
                        <InputLabel>Social Media Type</InputLabel>
                        <Select
                          value={newSocialMedia.socialMediaType}
                          onChange={(e) => setNewSocialMedia({ ...newSocialMedia, socialMediaType: e.target.value })}
                          label="Social Media Type"
                        >
                          {Object.keys(socialMediaIcons).map((type) => (
                            <MenuItem key={type} value={type}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                {socialMediaIcons[type]}
                                <Typography>{type.charAt(0) + type.slice(1).toLowerCase()}</Typography>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" onClick={() => setShowAddForm(false)}>
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleAddSocialMedia}
                          disabled={!newSocialMedia.profileName || !newSocialMedia.profileUrl || addSocialLoading}
                        >
                          Add Account
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                )}

                {/* Edit existing account form */}
                {editingAccountId && (
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper
                    }}
                  >
                    <Stack spacing={2}>
                      <TextField
                        label="Profile Name"
                        value={editFormData.profileName}
                        onChange={(e) => setEditFormData({ ...editFormData, profileName: e.target.value })}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Profile URL"
                        value={editFormData.profileUrl}
                        onChange={(e) => setEditFormData({ ...editFormData, profileUrl: e.target.value })}
                        fullWidth
                        size="small"
                        placeholder="https://example.com/username"
                      />
                      <FormControl fullWidth size="small">
                        <InputLabel>Social Media Type</InputLabel>
                        <Select
                          value={editFormData.socialMediaType}
                          onChange={(e) => setEditFormData({ ...editFormData, socialMediaType: e.target.value })}
                          label="Social Media Type"
                        >
                          {Object.keys(socialMediaIcons).map((type) => (
                            <MenuItem key={type} value={type}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                {socialMediaIcons[type]}
                                <Typography>{type.charAt(0) + type.slice(1).toLowerCase()}</Typography>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" onClick={() => setEditingAccountId(null)}>
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={handleUpdateAccount}
                          disabled={!editFormData.profileName || !editFormData.profileUrl || updateSocialLoading}
                        >
                          Update Account
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                )}

                {(socialMediaEdit || showAllSocialAccounts ? socialAccounts : socialAccounts.slice(0, 3)).map((account) =>
                  editingAccountId === account.id ? null : (
                    <Stack
                      key={account.id}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        px: 1,
                        py: 0.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        backgroundColor: theme.palette.background.paper
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {socialMediaIcons[account.type] || <Link1 variant="Bold" />}
                        <Typography variant="subtitle1">
                          {account.type.charAt(0) + account.type.slice(1).toLowerCase()}
                          {account.profileName && `: ${account.profileName}`}
                        </Typography>
                      </Stack>

                      {socialMediaEdit ? (
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small" onClick={() => handleEditAccount(account)} color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveSocial(account.id)}
                            disabled={deleteSocialLoading}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Link href={formatUrl(account.profileUrl)} target="_blank" underline="none">
                          <Tooltip title="View">
                            <IconButton
                              size="medium"
                              component="a"
                              href={account.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: socialMediaColors[account.type] || 'text.secondary',
                                borderRadius: 1,
                                padding: '4px'
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                    </Stack>
                  )
                )}

                {/* Show "See More" button if there are more than 3 accounts and not showing all */}
                {socialMediaEdit ||
                  (socialAccounts.length > 3 && !showAllSocialAccounts && (
                    <Button variant="text" size="small" onClick={() => setShowAllSocialAccounts(true)} sx={{ alignSelf: 'flex-end' }}>
                      See More ({socialAccounts.length - 3} more)
                    </Button>
                  ))}

                {/* Show "See Less" button when showing all accounts */}
                {socialMediaEdit ||
                  (showAllSocialAccounts && (
                    <Button variant="text" size="small" onClick={() => setShowAllSocialAccounts(false)} sx={{ alignSelf: 'flex-end' }}>
                      See Less
                    </Button>
                  ))}
                {socialMediaEdit && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Button variant="outlined" size="small" color="error" onClick={() => setSocialMediaEdit(false)}>
                      Close
                    </Button>
                  </Stack>
                )}

                {/* Empty state */}
                {socialAccounts.length === 0 && !showAddForm && !editingAccountId && (
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No social media accounts added yet
                    </Typography>
                    <Button size="small" startIcon={<Add />} onClick={() => setShowAddForm(true)} sx={{ mt: 1 }}>
                      Add Account
                    </Button>
                  </Box>
                )}
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
