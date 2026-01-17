import {
  MessageSquare,
  PhoneCall,
  Radio,
  X,
  ArrowLeft,
  Smile,
  Volume2,
  Menu,
  ChevronDown,
} from 'lucide-react';

export function getDistractionIcon(type) {
  const typeLower = type?.toLowerCase() || '';
  
  if (typeLower.includes('drinking')) {
    return { Icon: X, color: '#EF4444' };
  } else if (typeLower.includes('talking on the phone')) {
    return { Icon: PhoneCall, color: '#10B981' };
  } else if (typeLower.includes('texting')) {
    return { Icon: MessageSquare, color: '#3B82F6' };
  } else if (typeLower.includes('operating the radio')) {
    return { Icon: Radio, color: '#F97316' };
  } else if (typeLower === 'reaching behind') {
    return { Icon: ArrowLeft, color: '#FBBF24' };
  } else if (typeLower === 'hair and makeup') {
    return { Icon: Smile, color: '#A855F7' };
  } else if (typeLower.includes('talking to passenger')) {
    return { Icon: Volume2, color: '#EC4899' };
  } else {
    return { Icon: Menu, color: '#FFFFFF' };
  }
}
