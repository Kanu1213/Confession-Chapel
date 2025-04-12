// posts.controller.ts
import { Request, Response } from 'express';
import Post from '../models/post.model';
import { filterContent } from '../utils/filter';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    
    // 内容过滤
    const { cleanContent, isValid } = filterContent(content);
    if (!isValid) {
      return res.status(400).json({ error: '包含禁止内容' });
    }

    const newPost = new Post({
      content: cleanContent,
      authorIp: req.ip
    });

    await newPost.save();
    req.app.get('io').emit('new-post', newPost);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: '服务器错误' });
  }
};

export const votePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { voteType } = req.body;
    const voterId = req.cookies.voterId || generateVoterId();

    const post = await Post.findOneAndUpdate(
      { _id: postId, voters: { $ne: voterId } },
      { 
        $inc: { [`${voteType}Votes`]: 1 },
        $push: { voters: voterId }
      },
      { new: true }
    );

    if (!post) return res.status(400).json({ error: '投票失败' });

    res.cookie('voterId', voterId, { 
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    
    req.app.get('io').emit('update-post', post);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: '服务器错误' });
  }
};