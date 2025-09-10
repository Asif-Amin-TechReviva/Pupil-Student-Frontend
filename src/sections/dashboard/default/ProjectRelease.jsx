import React, { useEffect, useState } from 'react';
import { Typography, Stack, Divider, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { getAllEvents } from '../../../api/event';
import MainCard from 'components/MainCard';

function formatDateRange(start, end) {
  const s = new Date(start).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const e = new Date(end).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return s === e ? s : `${s} - ${e}`;
}

export default function StudentEventNoticeBoard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents()
      .then(setEvents)
      .catch((err) => console.error('Failed to fetch events', err));
  }, []);

  return (
    <MainCard>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          📋 Upcoming Events And Holidays
        </Typography>
        <Divider />

        {/* Scrollable only if more than 4 items */}
        <Box
          sx={{
            maxHeight: 4 * 54, // Assuming each item (with padding) is ~64px tall
            overflowY: 'auto',
            pr: 1
          }}
        >
          {events.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No events to display.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {events.map((event) => (
                <Box key={event.id}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={500}>
                      <EventIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle', color: 'green' }} />
                      {event.eventName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDateRange(event.startDate, event.endDate)}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </MainCard>
  );
}
